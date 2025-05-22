import { supabase } from '@/app/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name, email, password, phone } = await req.json();

  if (!name || !email || !password || !phone) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }


  // Check phone number uniqueness first
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('phone_number', phone)
    .single();

  if (existingUser) {
    return NextResponse.json({ error: 'Phone number already in use' }, { status: 409 });
  }

  // 1) Create user in auth
  const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });




  if (authError || !authData.user) {
    return NextResponse.json({ error: authError?.message || 'Signup failed' }, { status: 500 });
  }

  // 2) Now insert user profile using id from auth
  const userId = authData.user.id;

  const { error: insertError } = await supabase
    .from('users')
    .insert([{ id: userId, name, email, phone_number: phone }]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Signup successful' }, { status: 201 });
}

