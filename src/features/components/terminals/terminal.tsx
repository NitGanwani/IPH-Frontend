import { Terminal } from '../../models/terminal';

type PropsType = {
  item: Terminal;
};

export function Terminal({ item }: PropsType) {
  return (
    <li key={item.id}>
      <span>{item.name}</span>
    </li>
  );
}
