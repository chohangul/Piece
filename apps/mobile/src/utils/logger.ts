import * as FileSystem from 'expo-file-system';

class Logger {
  private logFile: string;
  private logs: string[] = [];

  constructor() {
    this.logFile = `${FileSystem.documentDirectory}piece_debug.log`;
    this.init();
  }

  private async init() {
    try {
      const info = await FileSystem.getInfoAsync(this.logFile);
      if (!info.exists) {
        await FileSystem.writeAsStringAsync(this.logFile, '=== Piece App Debug Log ===\n');
      }
      this.log('Logger initialized', 'INFO');
    } catch (error) {
      console.error('Failed to initialize logger:', error);
    }
  }

  private formatMessage(message: string, level: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}\n`;
  }

  async log(message: string, level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG' = 'INFO') {
    const formattedMessage = this.formatMessage(message, level);
    
    // Console에도 출력
    console.log(` ${formattedMessage.trim()}`);
    
    // 메모리에 저장
    this.logs.push(formattedMessage);
    
    // 파일에 쓰기
    try {
      await FileSystem.writeAsStringAsync(this.logFile, formattedMessage, {
        encoding: FileSystem.EncodingType.UTF8,
      });
    } catch (error) {
      console.error('Failed to write log:', error);
    }
  }

  async getLogs(): Promise<string> {
    try {
      const content = await FileSystem.readAsStringAsync(this.logFile);
      return content;
    } catch (error) {
      return 'Failed to read logs';
    }
  }

  async clearLogs() {
    try {
      await FileSystem.writeAsStringAsync(this.logFile, '=== Piece App Debug Log ===\n');
      this.logs = [];
    } catch (error) {
      console.error('Failed to clear logs:', error);
    }
  }

  getLogFilePath(): string {
    return this.logFile;
  }
}

export const logger = new Logger();
