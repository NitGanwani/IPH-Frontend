import { ChatRepository } from '../../core/services/chats/chat.repository';
import { GroupRepository } from '../../core/services/groups/group.repository';
import { TerminalRepository } from '../../core/services/terminals/terminal.repository';

export type GetTerminalPayload = {
  repo: TerminalRepository;
};

export type GetGroupPayload = {
  repo: GroupRepository;
};

export type GetChatPayload = {
  repo: ChatRepository;
};
