import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../core/store/store';
import { TerminalRepository } from '../../core/services/terminals/terminal.repository';
import { url } from '../../config';
import { useCallback } from 'react';
import {
  createTerminalAsync,
  loadTerminalsAsync,
  updateTerminalAsync,
} from '../redux/terminals.slice';
import { Terminal } from '../models/terminal';

export function useTerminals() {
  const { terminals } = useSelector((state: RootState) => state.terminals);
  const { token } = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch<AppDispatch>();
  const repo = new TerminalRepository(url, token);

  const handleLoadTerminals = useCallback(async () => {
    await dispatch(loadTerminalsAsync({ repo }));
  }, [repo, dispatch]);

  const handleCreateTerminal = async (terminal: FormData) => {
    await dispatch(createTerminalAsync({ repo, terminal }));
  };

  const handleUpdateTerminal = async (
    id: Terminal['id'],
    terminal: FormData
  ) => {
    await dispatch(updateTerminalAsync({ repo, id, terminal }));
  };

  return {
    handleLoadTerminals,
    terminals,
    handleCreateTerminal,
    handleUpdateTerminal,
  };
}
