let select_x_menu = document.getElementById("select-x");
let select_o_menu = document.getElementById("select-o");
let selection_bar = document.getElementById("selection-bar");
let vs_cpu_button = document.getElementById("versus-cpu");
let vs_player_button = document.getElementById("versus-player");
let player1 = 0;
let x_marks = [];
let o_marks = [];
let count = 0;
let win_counter = 0;



function menu(){
    select_x_menu.addEventListener("click",player1_choose_symbol(true));
    select_o_menu.addEventListener("click",player1_choose_symbol(false));
    vs_cpu_button.addEventListener("click",start_game(false));
    vs_player_button.addEventListener("click",start_game(true));
}

function player1_choose_symbol(symbol){
    return () => {
        let select_x_menu_img = select_x_menu.getElementsByTagName("img");
        let select_o_menu_img = select_o_menu.getElementsByTagName("img");
        if(symbol){
            selection_bar.className = "move-selection-bar-left";
            setTimeout(() => {select_x_menu_img[0].src = "./img/assets/x-dark.svg";
                              select_o_menu_img[0].src = "./img/assets/o-menu.svg";},150)
            player1 = 1;                  
        }else{
            selection_bar.className = "move-selection-bar-right";
            setTimeout(() => {select_o_menu_img[0].src = "./img/assets/o-dark.svg";
                              select_x_menu_img[0].src = "./img/assets/x-menu.svg";},150)
            player1 = 0;  
        }
    }
}

function start_game(against_player_or_cpu){
    return () => {
        let menu = document.getElementById("start-menu");
        let board = document.getElementById("board");
        let spaces = document.getElementsByClassName("space");
        console.log(spaces);
        let space_cpu_choose_to_play;
        menu.style.display = "none";
        board.style.display = "grid";
        if(against_player_or_cpu){
            for(let i in spaces)
            spaces[i].onclick = game_vs_player(i,spaces);
        }
        else{
            for(let i in spaces){
            spaces[i].onclick = game_vs_cpu(i,spaces);
            }
            space_cpu_choose_to_play = cpu_decision();
            spaces[space_cpu_choose_to_play];
        }
    }
}




function game_vs_player(space_clicked,spaces){
    return () => {
        if(count % 2 == 0){
            for(let i in x_marks)
            if(x_marks[i] == space_clicked || o_marks[i] == space_clicked)
            return;
            spaces[space_clicked].style = "background-image: url(./img/assets/icon-x.svg); background-size: 70px; background-repeat: no-repeat; background-position: 50%;";
            x_marks.push(space_clicked);
            for(let i = 0;i < 9;i++)
            spaces[i].style = spaces[i].style.cssText + "--url:url(./img/assets/icon-o-outline.svg);";
        }else{
            for(let i in x_marks)
            if(o_marks[i] == space_clicked || x_marks[i] == space_clicked)
            return;
            spaces[space_clicked].style = "background-image: url(./img/assets/icon-o.svg); background-size: 70px; background-repeat: no-repeat; background-position: 50%;";
            o_marks.push(space_clicked);
            for(let i = 0;i < 9;i++)
            spaces[i].style = spaces[i].style.cssText + "--url:url(./img/assets/icon-x-outline.svg);";
        }
        if(count >= 4){
            if(check_win() == 1)
                if(player1 == 1)
                alert("PLAYER1 WON");
                else
                alert("PLAYER2 WON");
            if(check_win() == 2)
                if(player1 == 0)
                alert("PLAYER1 WON");
                else
                alert("PLAYER2 WON");
            if(check_win() == 0)
                alert("NOBODY WON, YOU GUYS ARE BAD EQUALLY");    
        }
        count++;
    } 
}


function game_vs_cpu(space_clicked,spaces){
    let win_conditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    let space_cpu_choose_to_play;
    if(player1 == 1){
    }
    space_cpu_choose_to_play = cpu_decision(win_conditions);
    spaces[space_cpu_choose_to_play];
}


function cpu_decision(possibilities){
    for(let i in player_marks){

    }
}


function check_win(){
    let win_conditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]
    for(let j in win_conditions){
        win_counter = 0;
        for(let i in x_marks){
            if(x_marks[i].includes(win_conditions[j][0]) || x_marks[i].includes(win_conditions[j][1]) || x_marks[i].includes(win_conditions[j][2]))
                win_counter++; 
        }
        if(win_counter == 3){
            return 1;
        }
    }
    if(count == 4)
    return;
    for(let j in win_conditions){
        win_counter = 0;
        for(let i in o_marks){
            if(o_marks[i].includes(win_conditions[j][0]) || o_marks[i].includes(win_conditions[j][1]) || o_marks[i].includes(win_conditions[j][2]))
                win_counter++; 
        }
        if(win_counter == 3){
            return 2;
        }
    }
    if(count == 8)
    return 0;      
}



menu();