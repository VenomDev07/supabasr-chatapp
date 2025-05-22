import { supabase } from './supabase';

export type User = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  created_at: string;
  last_message: string;
  last_message_time: string;
  last_message_sender: string;
  last_message_receiver: string;
};

export type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  text: string | null;
  image: string | null;
  created_at: string;
  sender?: User;
};

export async function getUserList(currentUserId: string): Promise<User[]> {
  const { data, error } = await supabase
  .rpc('get_users_with_last_message', { current_user_id: currentUserId });

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }

  return data as User[];
}

export async function getMessagesByUsers(userId1: string, userId2: string): Promise<Message[]> {
  debugger


  
  
  const { data, error } = await supabase
  .from('formmessages')
  .select('*')
  .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
  .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching messages:', error);
    return [];
  }

  return data as Message[];
}

export async function sendMessage(senderId: string, receiverId: string, text: string, image?: string): Promise<boolean> {
  const { error } = await supabase
    .from('formmessages')
    .insert([
      { 
        sender_id: senderId, 
        receiver_id: receiverId, 
        text, 
        image: image || null 
      }
    ]);

  if (error) {
    console.error('Error sending message:', error);
    return false;
  }

  return true;
}

export async function subscribeToMessages(
  userId: string, 
  callback: (message: Message) => void
) {
  return supabase
    .channel('messages-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'formmessages',
      },
      (payload) => {
        const newMessage = payload.new;
        if (newMessage.sender_id === userId || newMessage.receiver_id === userId) {
          const fetchSenderInfo = async () => {
            const { data } = await supabase
              .from('users')
              .select('id, name, email')
              .eq('id', newMessage.sender_id)
              .single();

            const messageWithSender = {
              ...newMessage,
              sender: data
            } as Message;

            callback(messageWithSender);
          };

          fetchSenderInfo();
        }
      }
    )
    .subscribe();
}
