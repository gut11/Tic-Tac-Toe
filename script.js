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
let player_marks = [];
let cpu_marks = [];
let counter = 0;
let choosen_possibilitie = false;
let possibilitie_been_tryed;
let position_prevent_player_win = -1;
let last_j = [];





let player_1;

let player_2;


function create_object_player(symbol,symbol_style){
    return {
        symbol: symbol,
        marks: [],
        style: symbol_style,
        won: false,
        put_symbol_on_space: function(spaces,space_choosed){
            spaces[space_choosed].style = this.style;
            this.marks.push(space_choosed);
            return;
        },
        random_play: function (spaces) {
            let random_number = Math.floor((Math.random() * 9));
            spaces[random_number].style = this.style;
            this.marks.push(random_number);
            return;
        },
    };
}

function menu(){
    select_x_menu.addEventListener("click",player1_choose_symbol(true,false));
    select_o_menu.addEventListener("click",player1_choose_symbol(false,true));
    vs_cpu_button.addEventListener("click",start_game(false));
    vs_player_button.addEventListener("click",start_game(true));
}



function player1_choose_symbol(symbol,never_moved_selection_bar){
    if(never_moved_selection_bar){
    let style_x = "background-image: url(./img/assets/icon-x.svg); background-size: 70px; background-repeat: no-repeat; background-position: 50%;";
    let style_o = "background-image: url(./img/assets/icon-o.svg); background-size: 70px; background-repeat: no-repeat; background-position: 50%;";
    player_1 = create_object_player("o", style_o);
    player_2 = create_object_player("x", style_x);
    }  
    return (event) => {
        let select_x_menu_img = select_x_menu.getElementsByTagName("img");
        let select_o_menu_img = select_o_menu.getElementsByTagName("img");
        let style_x = "background-image: url(./img/assets/icon-x.svg); background-size: 70px; background-repeat: no-repeat; background-position: 50%;";
        let style_o = "background-image: url(./img/assets/icon-o.svg); background-size: 70px; background-repeat: no-repeat; background-position: 50%;";
        if(symbol){
            selection_bar.className = "move-selection-bar-left";
            setTimeout(() => {select_x_menu_img[0].src = "./img/assets/x-dark.svg";
                              select_o_menu_img[0].src = "./img/assets/o-menu.svg";},150);
            player_1 = create_object_player("x", style_x);
            player_2 = create_object_player("o", style_o);          
        }else{
            selection_bar.className = "move-selection-bar-right";
            setTimeout(() => {select_o_menu_img[0].src = "./img/assets/o-dark.svg";
                              select_x_menu_img[0].src = "./img/assets/x-menu.svg";},150);
            player_1 = create_object_player("o", style_o);
            player_2 = create_object_player("x", style_x); 
        }
    }
}



function start_game(against_player){
    return () => {
        let menu = document.getElementById("start-menu");
        let board = document.getElementById("board");
        let spaces = document.querySelectorAll(".space");
        menu.style.display = "none";
        board.style.display = "grid";
        if(against_player){
            for(let i in spaces)
            spaces[i].onclick = game_vs_player(i,spaces);
        }
        else{
            game_vs_cpu(spaces);
        }
    }
}



function game_vs_cpu(spaces){
    player_1.possibilities = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    player_2.possibilities = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    player_2.best_possibilities = [null];
    if(player_1.symbol != "x"){
        trade_icon_hover_animation(spaces);
        player_2.random_play(spaces);
    }
    for(let i = 0;i < spaces.length;i++){
    spaces[i].addEventListener("click",player_play(i,spaces))
    spaces[i].addEventListener("click",cpu_play(spaces,i))
    }
    
}


function trade_icon_hover_animation(spaces){
        for(let i = 0;i < spaces.length;i++)
        spaces[i].style = "--url:url(./img/assets/icon-o-outline.svg);";
        return;
}



function player_play(space_clicked,spaces){
    return () => {
    if(player_clicked_space_already_marked(space_clicked,1))
    return;
    player_1.put_symbol_on_space(spaces,space_clicked);
    return;
    }
}



function cpu_play(spaces,space_clicked){
    return () => {
        if(player_clicked_space_already_marked(space_clicked,2))
            return;
        filter_possibilities();
        let receive_answer = is_possible_for_cpu_win();
        if(receive_answer.answer){
            mark_space_and_set_player_2_to_win_state(spaces,player_2.best_possibilities[receive_answer.possibilitie_where_its_possible_win][receive_answer.space_missing_to_win]);
            end_game();
            return;
        }else    
            receive_answer = is_possible_for_oponnent_win();
        if(receive_answer.answer){
            player_2.put_symbol_on_space(spaces,player_1.possibilities[receive_answer.possibilitie_where_its_possible_win][receive_answer.space_missing_to_win]);
            return
        }
        else
            choose_randomly_between_best_possibilities(spaces);
        return;
    }
}



function choose_randomly_between_best_possibilities(spaces){
    let possibilitie_choosed;
    if(player_2.best_possibilities[0] != null){
        possibilitie_choosed = pick_one_possibility_randomly(player_2.best_possibilities.length);
        choose_one_space_not_used_from_possibility(spaces,possibilitie_choosed);
        return;
    }else{
        possibilitie_choosed = pick_one_possibility_randomly(player_2.possibilities.length);
        choose_any_space_from_possibility(spaces,possibilitie_choosed);
    }
}


function choose_any_space_from_possibility(spaces,possibilitie_choosed){
        let space_from_possibilitie_choosed;
        space_from_possibilitie_choosed = pick_one_possibility_randomly(3);
        player_2.put_symbol_on_space(spaces,player_2.possibilities[possibilitie_choosed][space_from_possibilitie_choosed]);
}


function choose_one_space_not_used_from_possibility(spaces,possibilitie_choosed){
    let space_from_possibilitie_choosed;
    if(player_2.marks.includes(player_2.best_possibilities[possibilitie_choosed][0])){
        space_from_possibilitie_choosed = pick_one_possibility_randomly(2) + 2;
        player_2.put_symbol_on_space(spaces,player_2.best_possibilities[possibilitie_choosed][space_from_possibilitie_choosed])
        return;
    }
    if(player_2.marks.includes(player_2.best_possibilities[possibilitie_choosed][1])){
        space_from_possibilitie_choosed = 1;
        while(space_from_possibilitie_choosed == 1)
        space_from_possibilitie_choosed = pick_one_possibility_randomly(3);
        player_2.put_symbol_on_space(spaces,player_2.best_possibilities[possibilitie_choosed][space_from_possibilitie_choosed])
        return;
    }
    if(player_2.marks.includes(player_2.best_possibilities[possibilitie_choosed][2])){
        space_from_possibilitie_choosed = pick_one_possibility_randomly(2);
        player_2.put_symbol_on_space(spaces,player_2.best_possibilities[possibilitie_choosed][space_from_possibilitie_choosed])
        return;
    }
}



function pick_one_possibility_randomly(amount_of_possibilities){
    return (Math.floor(Math.random() * amount_of_possibilities));
}




function is_possible_for_oponnent_win(){
    return is_possible_to_win(1,player_1.possibilities);
}


function is_possible_for_cpu_win(){
    return is_possible_to_win(2,player_2.best_possibilities);
}


function is_possible_to_win(player_marks,possibilities){
    if(player_marks == 1)
        player_marks = player_1.marks;
    else
        player_marks = player_2.marks;
    let number_spaces_marked_match_possibilities;
    let space_missing_to_win;
    if(player_2.best_possibilities[0] == null)
    return {answer: false};
    for(let i in possibilities){
        number_spaces_marked_match_possibilities = 0;
        if(player_marks.includes(possibilities[i][0]))
            number_spaces_marked_match_possibilities++;
        else
            space_missing_to_win = 0;    
        if(player_marks.includes(possibilities[i][1]))
            number_spaces_marked_match_possibilities++;
        else
            space_missing_to_win = 1;  
        if(player_marks.includes(possibilities[i][2]))
            number_spaces_marked_match_possibilities++;
        else
            space_missing_to_win = 2;  
        if(number_spaces_marked_match_possibilities == 2){
            return {answer: true,possibilitie_where_its_possible_win: i,space_missing_to_win: space_missing_to_win};
        }
        }
        return {answer: false};  
}

function mark_space_and_set_player_2_to_win_state(spaces,space_missing_to_win){
    player_2.put_symbol_on_space(spaces,space_missing_to_win);
    player_2.won = true;
}


function filter_possibilities(){
    discard_possibilities_already_countered(1,player_1.possibilities);
    discard_possibilities_already_countered(2,player_2.possibilities);
    cpu_search_possibilities_ahead_other_possibilities();
    return;
}


function discard_possibilities_already_countered(player_number,possibilities){
    let opponent_marks;
    if(player_number == 2)
        opponent_marks = player_1.marks;
    else
        opponent_marks = player_2.marks;
    for(i=0;i < possibilities.length;i++){
        i = parseInt(i);
        if(opponent_marks.includes(possibilities[i][0]) || opponent_marks.includes(possibilities[i][1]) || opponent_marks.includes(possibilities[i][2])){
            if(player_number == 2)
            player_2.possibilities.splice(i,1);
            else
            player_1.possibilities.splice(i,1);
            i--;
        } 
    }
}



function cpu_search_possibilities_ahead_other_possibilities(){
    player_2.best_possibilities = [null];
    for(i=0;i < player_2.possibilities.length;i++){
    if(player_2.marks.includes(player_2.possibilities[i][0]) || player_2.marks.includes(player_2.possibilities[i][1]) || player_2.marks.includes(player_2.possibilities[i][2])){
        if(player_2.best_possibilities[0] == null)
            player_2.best_possibilities.splice(0,1);
        player_2.best_possibilities.push(player_2.possibilities[i])
    }
}
}


function player_clicked_space_already_marked(space_clicked,player_who_called_function){
    let amount_rounds_played_from_who_started_game;
    if(player_who_called_function == 1)
    amount_rounds_played_from_who_started_game = player_1.marks.length;
    else
    amount_rounds_played_from_who_started_game = player_2.marks.length;
    for(let i = 0; i < amount_rounds_played_from_who_started_game;i++)
    if(player_1.marks[i] == space_clicked || player_2.marks[i] == space_clicked)
    return true;
    return false;
}





function choose_randomly_between_possibilities(amount_of_possibilities){
    return (Math.floor(Math.random() * amount_of_possibilities));
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
            if(check_win(x_marks,o_marks) == 1)
                if(player1 == 1)
                alert("PLAYER1 WON");
                else
                alert("PLAYER2 WON");
            if(check_win(x_marks,o_marks) == 2)
                if(player1 == 0)
                alert("PLAYER1 WON");
                else
                alert("PLAYER2 WON");
            if(check_win(x_marks,o_marks) == 0)
                alert("NOBODY WON, YOU GUYS ARE BAD EQUALLY");    
        }
        count++;
    } 
}





menu();

