export class ChatRequestDto {
  message: string;
  history?: { role: string; content: string }[];
}
