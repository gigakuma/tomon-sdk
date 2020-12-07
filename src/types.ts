import { GatewayOp } from './network/session';
import ET from './events';

export type PowerPartial<T> = {
  [U in keyof T]?: T[U] extends object ? PowerPartial<T[U]> : T[U];
};

export type WSPayloadType = ET;
export type WSPayload<T extends ET> = T extends 'NETWORK_CONNECTED' | 'NETWORK_DISCONNECTED'
  ? never
  : T extends 'NETWORK_RECONNECTING'
  ? { count: number }
  : {
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
        ? any // TODO: 补充类型
        : any;
      e: T;
    };

export interface Message {
  id: string;
  channel_id: string;
  author: User;
  type: number;
  content?: string;
  timestamp: string;
  nonce: string;
  attachments: Attachment[];
  reactions: Reaction[];
  mentions?: User[];
  stamps: Stamp[];
  pinned: boolean;
  edited_timestamp?: string;
  reply: Message;
}

export interface Guild {
  id: string;
  name: string;
  icon: string;
  icon_url: string;
  background?: string;
  background_url?: string;
  background_props?: string;
  description?: string;
  owner_id: string;
  joined_at: string;
  position: number;
  default_message_notifications: number;
  system_channel_flags: number;
  system_channel_id?: string;
  banned: boolean;
  updated_at: string;
}

export interface Channel {
  id: string;
  type: number;
  name: string;
  guild_id: string;
  position: number;
  permission_overwrites: Overwrite[];
  parent_id: string;
  topic: string;
  last_message_id: string;
  last_pin_timestamp: string;
  default_message_notifications: number;
}

export interface Overwrite {
  id: string;
  type: string;
  allow: number;
  deny: number;
}

export interface User {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  name: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
  email: string;
  email_verified: boolean;
  phone: number;
  phone_verified: boolean;
  type: number;
  is_bot: boolean;
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
  nick: string | null;
  joined_at: string;
  mute: boolean;
  deaf: boolean;
  roles: string[];
}

export interface Attachment {
  id: string;
  filename: string;
  hash: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface Reaction {
  emoji: PartialEmoji;
  count: number;
  me: boolean;
}

export interface PartialEmoji {
  id?: string;
  name?: string;
}

export interface Stamp {
  id: string;
  alias: number;
  author_id: string;
  position: number;
  hash: string;
  animated: boolean;
  url: string;
  width: number;
  height: number;
  updated_at: string;
}

export interface StampPackage {
  author_id: string;
  type: number;
  name: string;
  stamps: Stamp[];
  updated_at: string;
}
