import "bootstrap";
import { Chat } from '../components/chat_client';
import { Notifyer } from '../components/notifyer';

global.Chat = new Chat;
global.Notifyer = new Notifyer;
