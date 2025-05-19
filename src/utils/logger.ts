const PREFIX: string = ">>>";

export function logger(...args: any[]): void {
  console.log(PREFIX, ...args);
}
