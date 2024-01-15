import { Terminal } from '../../models/terminal';

type PropsType = {
  item: Terminal;
};

export function TerminalCard({ item }: PropsType) {
  return (
    <li key={item.id}>
      <span>{item.name}</span>
    </li>
  );
}
