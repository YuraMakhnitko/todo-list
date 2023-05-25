import comlete from "../sounds/ui/completed.mp3";
import unComplete from "../sounds/ui/unComplete2.mp3";
import remove from "../sounds/ui/deleteTodo.mp3";
import addTodo from "../sounds/ui/beep6.mp3";
import changePage from "../sounds/ui/switch.mp3";
import submitSound from "../sounds/ui/submit.mp3";
import toggle from "../sounds/ui/toggle.mp3";
import errorSound from "../sounds/ui/error2.mp3";

interface Sounds {
  comlete: string;
  unComplete: string;
  remove: string;
  addTodo: string;
  changePage: string;
  toggle: string;
  submitSound: string;
  errorSound: string;
}

export const sounds: Sounds = {
  comlete,
  unComplete,
  remove,
  addTodo,
  changePage,
  submitSound,
  toggle,
  errorSound,
};
