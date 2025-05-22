import { supabase } from '@/app/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const sender = url.searchParams.get('sender');
  const receiver = url.searchParams.get('receiver');

  if (!sender || !receiver) {
    return NextResponse.json({ error: 'Both sender and receiver IDs are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('formmessages')
    .select(`
      *,
      sender:sender_id(id, name, email)
    `)
    .or(`and(sender_id.eq.${sender},receiver_id.eq.${receiver}),and(sender_id.eq.${receiver},receiver_id.eq.${sender})`)
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ messages: data }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { sender_id, receiver_id, text, image } = await req.json();

  if (!sender_id || !receiver_id || (!text && !image)) {
    return NextResponse.json({ error: 'Sender, receiver, and message content are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('formmessages')
    .insert([
      { 
        sender_id, 
        receiver_id, 
        text: text || null, 
        image: image || null 
      }
    ])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: data[0] }, { status: 201 });
}