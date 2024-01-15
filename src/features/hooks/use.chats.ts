import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../core/store/store';
import { ChatRepository } from '../../core/services/chats/chat.repository';
import { url } from '../../config';
import { useCallback } from 'react';
import { loadChatsAsync } from '../redux/chats.slice';

export function useChats() {
  const { chats } = useSelector((state: RootState) => state.chats);

  const dispatch = useDispatch<AppDispatch>();
  const repo = new ChatRepository(url);

  const handleLoadChats = useCallback(async () => {
    await dispatch(loadChatsAsync({ repo }));
  }, [repo, dispatch]);

  return {
    handleLoadChats,
    chats,
  };
}
