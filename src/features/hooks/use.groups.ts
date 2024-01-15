import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../core/store/store';
import { GroupRepository } from '../../core/services/groups/group.repository';
import { url } from '../../config';
import { useCallback } from 'react';
import { loadGroupsAsync } from '../redux/groups.slice';

export function useGroups() {
  const { groups } = useSelector((state: RootState) => state.groups);

  const dispatch = useDispatch<AppDispatch>();
  const repo = new GroupRepository(url);

  const handleLoadGroups = useCallback(async () => {
    await dispatch(loadGroupsAsync({ repo }));
  }, [repo, dispatch]);

  return {
    handleLoadGroups,
    groups,
  };
}
