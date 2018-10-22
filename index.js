import playC4 from './connect4';
import playXO from './tic-tac-toe';

import inquirer from 'inquirer';

const chooseGame = async () => {
  const ans = await inquirer.prompt([
    {
      type: 'input',
      name: 'C4',
      message: `Enter 0 for Tic-Tac-Toe or 1 for Connect Four:`,
    },
  ]);

  if (parseInt(ans.C4)) {
    playC4();
  } else {
    playXO();
  }
};

chooseGame();
