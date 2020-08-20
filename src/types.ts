import { GatewayOp } from './network/session';
import ET from './events';

export type PowerPartial<T> = {
  [U in keyof T]?: T[U] extends object ? PowerPartial<T[U]> : T[U];
};

export interface WSPayload<T extends ET> {
  op: GatewayOp;
  d: T extends 'MESSAGE_CREATE' | 'MESSAGE_DELETE' | 'MESSAGE_UPDATE'
    ? Message
    : T extends 'GUILD_CREATE' | 'GUILD_ROLE_DELETE' | 'GUILD_ROLE_UPDATE'
    ? Guild
    : T extends 'CHANNEL_CREATE' | 'CHANNEL_DELETE' | 'CHANNEL_UPDATE'
    ? Channel
    : T extends 'EMOJI_CREATE' | 'EMOJI_DELETE' | 'EMOJI_UPDATE'
    ? Emoji
    : T extends 'GUILD_MEMBER_ADD' | 'GUILD_MEMBER_REMOVE' | 'GUILD_MEMBER_UPDATE'
    ? GuildMember
    : T extends
        | 'READY'
        | 'HELLO'
        | 'DISPATCH'
        | 'HEARTBEAT'
        | 'HEARTBEAT_ACK'
        | 'GUILD_POSITION'
        | 'CHANNEL_POSITION'
        | 'GUILD_ROLE_POSITION'
        | 'MESSAGE_REACTION_ADD'
        | 'MESSAGE_REACTION_REMOVE'
        | 'MESSAGE_REACTION_REMOVE_ALL'
        | 'VOICE_STATE_UPDATE'
        | 'USER_TYPING'
        | 'USER_PRESENCE_UPDATE'
    ? any // TODO
    : any;
  e: T;
}

export interface Author {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  name: string;
  avatar_url: string;
  type: number;
}

export interface Message {
  id: string;
  channel_id: string;
  author: Author;
  type: number;
  content: string;
  timestamp: Date;
  nonce: string;
  attachments: string[];
  reactions: string[];
  mentions: string[];
  stamps: string[];
  pinned: boolean;
  edited_timestamp: number;
}

export interface Guild {
  id: string;
  name: string;
  icon: string;
  icon_url: string;
  background: string;
  background_url: string;
  background_props: string;
  description: string;
  owner_id: string;
  joined_at: string;
  position: number;
  default_message_notifications: number;
  system_channel_flags: number;
  system_channel_id: string;
  banned: boolean;
  updated_at: string;
}

export interface Channel {
  id: string;
  type: number;
  name: string;
  guild_id: string;
  position: number;
  permission_overwrites: any[];
  parent_id: string;
  topic: string;
  last_message_id: string;
  last_pin_timestamp: string;
  default_message_notifications: number;
}

export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  name: string;
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
  type: number;
}

export interface Emoji {
  id: string;
  guild_id: string;
  name: string;
  img: string;
  img_url: string;
  user: User;
  managed: boolean | null;
  animated: boolean | null;
}

export interface GuildMember {
  user: User;
  guild_id: string;
  nick: string;
  joined_at: string;
  mute: boolean;
  deaf: boolean;
  roles: string[];
}
