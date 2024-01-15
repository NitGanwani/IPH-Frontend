import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../core/store/store';
import { TerminalRepository } from '../../core/services/terminals/terminal.repository';
import { url } from '../../config';
import { useCallback } from 'react';
import { loadTerminalsAsync } from '../redux/terminals.slice';

export function useTerminals() {
  const { terminals } = useSelector((state: RootState) => state.terminals);

  const dispatch = useDispatch<AppDispatch>();
  const repo = new TerminalRepository(url);

  const handleLoadTerminals = useCallback(async () => {
    await dispatch(loadTerminalsAsync({ repo }));
  }, [repo, dispatch]);

  return {
    handleLoadTerminals,
    terminals,
  };
}
