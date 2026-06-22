import { Entity } from "@shared/domain/entities/Entity/";
import type { PlayedMinutesVO } from "../value-objects/PlayedMinutesVO";
import type { PingVO } from "../value-objects/PingVO";
import type { HourVO } from "../value-objects/HourVO";

type GameSessionProps = {
  startDate: Date;
  startTime: HourVO;
  playedMinutes: PlayedMinutesVO;
  averagePingMs: PingVO;
};

export class GameSession extends Entity<GameSessionProps> {
  get startDate(): Date {
    return this.props.startDate;
  }

  get startTime(): HourVO {
    return this.props.startTime;
  }

  get playedMinutes(): PlayedMinutesVO {
    return this.props.playedMinutes;
  }

  get averagePingMs(): PingVO {
    return this.props.averagePingMs;
  }

  finishSession(minutes: PlayedMinutesVO, averagePingMs: PingVO): void {
    this.props.playedMinutes = minutes;
    this.props.averagePingMs = averagePingMs;
    this.touch();
  }
}
