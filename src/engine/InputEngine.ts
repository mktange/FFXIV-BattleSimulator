 

 class InputEngine {
   bindings: { [code: number]: string };
   actions: { [id: string]: boolean; };

   constructor(canvas: HTMLCanvasElement) {
     this.bindings = {};
     this.actions = {};

     // WASD
     this.bind(65, 'move-left');
     this.bind(87, 'move-up');
     this.bind(68, 'move-right');
     this.bind(83, 'move-down');

     // Arrow keys
     this.bind(37, 'move-left');
     this.bind(38, 'move-up');
     this.bind(39, 'move-right');
     this.bind(40, 'move-down');

     // Special actions
     this.bind(88, 'special-x'); // X
     this.bind(67, 'special-c'); // C
     

     canvas.addEventListener('keydown', this.onKey(this, true));
     canvas.addEventListener('keyup', this.onKey(this, false));
   }

   onKey(inputEngine: InputEngine, down: boolean): (KeyBoardEvent) => any {
     return function (event: KeyboardEvent) {
       var action = inputEngine.bindings[event.keyCode];
       if (action) inputEngine.actions[action] = down;
     }
   }


   private bind(key: number, action: string) {
     this.bindings[key] = action;
   }
  
 }