import { Pipe, PipeTransform } from '@angular/core';

type DurationMode = 'full' | 'biggest';
type OutputMode = 'full' | 'short';

const outputStrategy = {
  full: ['days', 'hours', 'minutes', 'seconds'],
  short: ['d', 'h', 'min', 's'],
};

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(duration: number, durationMode: DurationMode = 'full', outputMode: OutputMode = 'short' ): string {
    const slots = this.calculateTimeslots(duration);
    const labels = outputStrategy[outputMode];
    const durationText = slots.reduce((txt, slot, index) =>
      txt.length > 0 && durationMode === 'biggest' ? txt
        : slot === 0 && txt.length === 0 ? txt
        : `${txt} ${slot} ${labels[index]}`,
      ''
    );

    return durationText.trim();
  }

  private calculateTimeslots(duration: number) {
    const timeslots = [];

    const seconds = Math.floor(duration / 1000);
    const secondsSlot = Math.floor(seconds % 60);
    timeslots.push(secondsSlot);

    const minutes = Math.floor((seconds - secondsSlot) / 60);
    const minutesSlot = Math.floor(minutes % 60);
    timeslots.push(minutesSlot);

    const hours = Math.floor((minutes - minutesSlot) / 60);
    const hoursSlot = Math.floor(hours % 24);
    timeslots.push(hoursSlot);

    const days = Math.floor((hours - hoursSlot) / 24);
    timeslots.push(days);

    return timeslots.reverse();
  }

}
