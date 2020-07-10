class EventSourcer {
  constructor() {
    this.value = 0;
    this.undoNumStack = [];
    this.undoOpStack = [];
    this.redoNumStack = [];
    this.redoOpStack = [];
  }

  add(num) {
  	this.value += num;
  	this.undoNumStack.push(num);
  	this.undoOpStack.push("add");
  }

  subtract(num) {
  	this.value -= num;
  	this.undoNumStack.push(num);
  	this.undoOpStack.push("sub");
  }

  undo() {
  	if (this.undoNumStack.length === 0) {
        return; 
  	}

  	//Apply undo operation
    const operation = this.undoOpStack.pop();
    const number = this.undoNumStack.pop();
    if (operation === "add") {
    	this.value -= number;
    } else {
    	this.value += number;
    }

    //Push the undo operations to the redo stack
    this.redoNumStack.push(number);
    this.redoOpStack.push(operation);
  }

  redo() {
  	if (this.redoNumStack.length === 0) {
        return; 
  	}

  	//Apply redo operations
  	const operation = this.redoOpStack.pop();
    const number = this.redoNumStack.pop();
    if (operation === "add") {
    	this.value += number;
    } else {
    	this.value -= number;
    }
  }

  bulk_undo(num) {
  	for (var i = 0; i < num; i++) {
  		this.undo();
  	}
  }
  bulk_redo(num) {
  	for (var i = 0; i < num; i++) {
  		this.redo();
  	}
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
