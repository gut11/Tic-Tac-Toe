let player_1;
let player_2;
let round_counter = 0;
let free_spaces = [];
let games_tied = 0;
let teste;



function create_object_player(symbol,symbol_style,src,color,darker_color,which_player){
    return {
        marks: [],
        wins: 0,
        symbol: symbol,
        style: symbol_style,
        img_src: src,
        color: [color,darker_color],
        which_player: which_player,
        won: false,
        is_cpu: false,
        put_symbol_on_space: function(spaces,space_choosed){
            spaces[space_choosed].style = this.style;
            this.marks.push(space_choosed);
            return;
        },
        random_play: function (spaces) {
            let random_number = Math.floor((Math.random() * free_spaces.length));
            console.log(random_number);
            console.log(free_spaces);
            this.put_symbol_on_space(spaces,free_spaces[random_number]);
            remove_space_clicked_from_free_spaces(random_number);
            return;
        },
        check_win: function (spaces){
            let marks_match_possibility_space;
            let win_conditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
            for(let i in win_conditions){
                marks_match_possibility_space = 0;
                if(this.marks.includes(win_conditions[i][0]))
                    marks_match_possibility_space++;
                if(this.marks.includes(win_conditions[i][1]))
                    marks_match_possibility_space++;
                if(this.marks.includes(win_conditions[i][2]))
                    marks_match_possibility_space++;
                if(marks_match_possibility_space == 3){
                    this.won = true;
                    end_game(spaces);
                }
            }
        }
    };
}



function menu(){
    let select_x_menu = document.getElementById("select-x");
    let select_o_menu = document.getElementById("select-o");
    let vs_cpu_button = document.getElementById("versus-cpu");
    let vs_player_button = document.getElementById("versus-player");
    select_x_menu.addEventListener("click",player1_choose_symbol(true,false));
    select_o_menu.addEventListener("click",player1_choose_symbol(false,true));
    vs_cpu_button.addEventListener("click",start_game(false));
    vs_player_button.addEventListener("click",start_game(true));
}



function player1_choose_symbol(symbol,never_moved_selection_bar){
    if(never_moved_selection_bar){
    let selection_bar = document.getElementById("selection-bar");
    let select_x_menu = document.getElementById("select-x");
    let select_o_menu = document.getElementById("select-o");
    let select_x_menu_img = select_x_menu.getElementsByTagName("img");
    let select_o_menu_img = select_o_menu.getElementsByTagName("img");
    let style_x = "background-image: url(./img/assets/icon-x.svg); background-size: 8.2vmin; background-repeat: no-repeat; background-position: 50%;";
    let style_o = "background-image: url(./img/assets/icon-o.svg); background-size: 8.2vmin; background-repeat: no-repeat; background-position: 50%;";
    let src_x = "./img/assets/icon-x.svg";
    let src_o = "./img/assets/icon-o.svg";
    let color_x = "#34beba";
    let color_o = "#f2b137";
    let dark_color_x = "#118c87";
    let dark_color_o = "#cc8b13";
    selection_bar.className = "move-selection-bar-right";
    setTimeout(() => {select_o_menu_img[0].src = "./img/assets/o-dark.svg";
                      select_x_menu_img[0].src = "./img/assets/x-menu.svg";},0);
    player_1 = create_object_player("o", style_o, src_o, color_o, dark_color_o, 1);
    player_2 = create_object_player("x", style_x, src_x, color_x, dark_color_x, 2);
    }  
    return (event) => {
        let selection_bar = document.getElementById("selection-bar");
        let select_x_menu = document.getElementById("select-x");
        let select_o_menu = document.getElementById("select-o");
        let select_x_menu_img = select_x_menu.getElementsByTagName("img");
        let select_o_menu_img = select_o_menu.getElementsByTagName("img");
        let style_x = "background-image: url(./img/assets/icon-x.svg); background-size: 8.2vmin; background-repeat: no-repeat; background-position: 50%;";
        let style_o = "background-image: url(./img/assets/icon-o.svg); background-size: 8.2vmin; background-repeat: no-repeat; background-position: 50%;";
        let src_x = "./img/assets/icon-x.svg";
        let src_o = "./img/assets/icon-o.svg";
        let color_x = "#34beba";
        let color_o = "#f2b137";
        let dark_color_x = "#118c87";
        let dark_color_o = "#cc8b13";
        if(symbol){
            selection_bar.className = "move-selection-bar-left";
            setTimeout(() => {select_x_menu_img[0].src = "./img/assets/x-dark.svg";
                              select_o_menu_img[0].src = "./img/assets/o-menu.svg";},150);
            player_1 = create_object_player("x", style_x, src_x, color_x, dark_color_x, 1);
            player_2 = create_object_player("o", style_o, src_o, color_o, dark_color_o, 2);          
        }else{
            selection_bar.className = "move-selection-bar-right";
            setTimeout(() => {select_o_menu_img[0].src = "./img/assets/o-dark.svg";
                              select_x_menu_img[0].src = "./img/assets/x-menu.svg";},150);
            player_1 = create_object_player("o", style_o, src_o, color_o, dark_color_o, 1);
            player_2 = create_object_player("x", style_x, src_x, color_x, dark_color_x, 2); 
        }
    }
}



function add_event_to_end_game_and_restart_screen_buttons(spaces){
    let next_round_button = document.getElementById("next-round-button");
    let button_back_menu = document.getElementById("back-menu-button");
    let end_game_screen = document.getElementById("end-game-screen");
    let cancel_restart_screen_button = document.getElementById("cancel-button");
    let back_menu_restart_screen_button = document.getElementById("restart-back-menu");
    let reset_game_restart_screen_button = document.getElementById("reset-game-button");
    let open_restart_screen_button = document.getElementById("reset-game");
    open_restart_screen_button.addEventListener("click",open_restart_screen);
    cancel_restart_screen_button.addEventListener("click",close_restart_screen);
    back_menu_restart_screen_button.addEventListener("click", reset_game(spaces,end_game_screen));
    reset_game_restart_screen_button.addEventListener("click", reset_score);
    reset_game_restart_screen_button.addEventListener("click", next_round(spaces,end_game_screen));
    next_round_button.addEventListener("click",next_round(spaces,end_game_screen));
    button_back_menu.addEventListener("click", reset_game(spaces,end_game_screen));
    return;
}



function reset_score(){
    player_1.wins = 0;
    player_2.wins = 0;
    games_tied = 0;
    close_restart_screen();
}



function open_restart_screen(){
    let restart_screen = document.getElementById("restart-screen-container");
    restart_screen.style.display = "flex";
}



function close_restart_screen(){
    let restart_screen = document.getElementById("restart-screen-container");
    restart_screen.style.display = "none";
}



function start_game(is_against_player){
    return () =>  {
        let menu = document.getElementById("start-menu");
        let board = document.getElementById("board");
        let spaces = document.querySelectorAll(".space");
        add_event_to_end_game_and_restart_screen_buttons(spaces);
        menu.style.display = "none";
        board.style.display = "grid";
        if(is_against_player == false)
            player_2.is_cpu = true;
        update_score_board();
        if(is_against_player)
            game_vs_player(spaces);
        else
            game_vs_cpu(spaces);
    }
}



function game_vs_cpu(spaces){
    player_1.possibilities = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    player_2.possibilities = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    player_2.best_possibilities = [null];
    free_spaces = [0,1,2,3,4,5,6,7,8];
    if(player_1.symbol == "o"){
        trade_icon_hover_animation(spaces,player_1.symbol);
        player_2.random_play(spaces);
        trade_turn_icon(player_1.symbol);
    }
    for(let i = 0;i < spaces.length;i++){
        spaces[i].addEventListener("click",player_play_vs_cpu(i,spaces));
        spaces[i].addEventListener("click",cpu_play(spaces,i));
        }
    }



function trade_icon_hover_animation(spaces,symbol){
    let hover_animation_style;
    if(symbol == "x")
        hover_animation_style = "--url:url(./img/assets/icon-x-outline.svg);";
    if(symbol == "o")
        hover_animation_style = "--url:url(./img/assets/icon-o-outline.svg);";
     for(let i = 0;i < spaces.length;i++)
        spaces[i].style = spaces[i].style.cssText + hover_animation_style;
        return;
    }



function trade_turn_icon(symbol){
    let turn_icon = document.getElementById("img-game-icons");
    if(symbol == "x")
        turn_icon.src = "./img/assets/x-menu.svg";
    if(symbol == "o")
        turn_icon.src = "./img/assets/o-menu.svg";
}



function player_play_vs_cpu(space_clicked,spaces){
    return () => {
        round_counter++;
        if(player_clicked_space_already_marked(space_clicked,1))
            return;
        remove_space_clicked_from_free_spaces(space_clicked);
        player_1.put_symbol_on_space(spaces,space_clicked);
        if(round_counter >= 3){
            player_1.check_win(spaces);
        }
        return;
    }
}



function player_clicked_space_already_marked(space_clicked,player_who_called_function){
    let amount_rounds_played_from_who_started_game;
    if(player_1.symbol == "x"){
        if(player_who_called_function == 1)
            amount_rounds_played_from_who_started_game = player_1.marks.length;
        else
            amount_rounds_played_from_who_started_game = player_2.marks.length;
    }
    if(player_1.symbol == "o"){
        if(player_who_called_function == 1)
            amount_rounds_played_from_who_started_game = player_2.marks.length;
        else
            amount_rounds_played_from_who_started_game = player_1.marks.length - 1;
    }
    for(let i = 0; i < amount_rounds_played_from_who_started_game;i++)
    if(player_1.marks[i] == space_clicked || player_2.marks[i] == space_clicked)
    return true;
    return false;
}



function cpu_play(spaces,space_clicked){
    return () => {
        let receive_answer;
        if(player_1.won){
            console.log("entrou no player_win")
            return;
        }
        console.log("passou reto do gama tied")
        console.log(spaces);
        if(player_clicked_space_already_marked(space_clicked,2))
            return;
        filter_possibilities();
        if(game_tied()){
            end_game(spaces);
            return;
        }
        if(is_impossible_win(spaces)){
        if(game_tied()){
            end_game(spaces);
            return;
        }
            return;
        }
        receive_answer = is_possible_for_cpu_win();
        if(receive_answer.answer){
            console.log("cu de anguo");
            mark_space_and_set_player_2_to_win_state(spaces,player_2.best_possibilities[receive_answer.possibilitie_where_its_possible_win][receive_answer.space_missing_to_win]);
            end_game(spaces);
            return;
        }else    
            receive_answer = is_possible_for_oponnent_win();
        if(receive_answer.answer){
            mark_space_where_opponent_could_win(spaces,receive_answer);
            return;
        }
        else
            choose_randomly_between_best_possibilities(spaces);
        return;
    }
}



function filter_possibilities(){
    if(possibilities_ended())
        return;
    discard_possibilities_already_countered(1,player_1.possibilities);
    discard_possibilities_already_countered(2,player_2.possibilities);
    if(possibilities_ended())
        return;
    cpu_search_possibilities_ahead_other_possibilities();
    return;
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



function possibilities_ended(){
    if(player_2.possibilities == null){
        return true;
    }
    if(player_2.possibilities.length == 0){
        player_2.possibilities = null;
        return true;
    }
    else
        return false;
}



function game_tied(){
    if(free_spaces.length == 0)
    return true;
    else
    return false;
}



function is_impossible_win(spaces){
    if(player_2.possibilities == null){
        receive_answer = is_possible_for_oponnent_win();
        if(receive_answer.answer){
            mark_space_where_opponent_could_win(spaces,receive_answer);
            return true;
        }
        player_2.random_play(spaces);
        return true;
    }
    else
        return false;
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



function mark_space_where_opponent_could_win(spaces,receive_answer){
    let space_where_player_could_win = player_1.possibilities[receive_answer.possibilitie_where_its_possible_win][receive_answer.space_missing_to_win];
    player_2.put_symbol_on_space(spaces,space_where_player_could_win);
    remove_space_clicked_from_free_spaces(space_where_player_could_win);
    return;
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



function choose_one_space_not_used_from_possibility(spaces,possibilitie_choosed){
let space_from_possibilitie_choosed;
if(player_2.marks.includes(player_2.best_possibilities[possibilitie_choosed][0])){
    space_from_possibilitie_choosed = pick_one_possibility_randomly(2) + 1;
    remove_space_clicked_from_free_spaces(player_2.best_possibilities[possibilitie_choosed][space_from_possibilitie_choosed]);
    player_2.put_symbol_on_space(spaces,player_2.best_possibilities[possibilitie_choosed][space_from_possibilitie_choosed]);
    return;
}
if(player_2.marks.includes(player_2.best_possibilities[possibilitie_choosed][1])){
    space_from_possibilitie_choosed = 1;
    while(space_from_possibilitie_choosed == 1)
    space_from_possibilitie_choosed = pick_one_possibility_randomly(3);
    remove_space_clicked_from_free_spaces(player_2.best_possibilities[possibilitie_choosed][space_from_possibilitie_choosed]);
    player_2.put_symbol_on_space(spaces,player_2.best_possibilities[possibilitie_choosed][space_from_possibilitie_choosed]);
    return;
}
if(player_2.marks.includes(player_2.best_possibilities[possibilitie_choosed][2])){
    space_from_possibilitie_choosed = pick_one_possibility_randomly(2);
    remove_space_clicked_from_free_spaces(player_2.best_possibilities[possibilitie_choosed][space_from_possibilitie_choosed]);
    player_2.put_symbol_on_space(spaces,player_2.best_possibilities[possibilitie_choosed][space_from_possibilitie_choosed]);
    return;
}
}



function pick_one_possibility_randomly(amount_of_possibilities){
    return (Math.floor(Math.random() * amount_of_possibilities));
}



function choose_any_space_from_possibility(spaces,possibilitie_choosed){
    let space_from_possibilitie_choosed;
    space_from_possibilitie_choosed = pick_one_possibility_randomly(3);
    remove_space_clicked_from_free_spaces(player_2.possibilities[possibilitie_choosed][space_from_possibilitie_choosed]);
    player_2.put_symbol_on_space(spaces,player_2.possibilities[possibilitie_choosed][space_from_possibilitie_choosed]);
}



function game_vs_player(spaces){
    free_spaces = [0,1,2,3,4,5,6,7,8];
    for(let i=0;i < spaces.length;i++)
        spaces[i].addEventListener("click",player_1_or_player_2_play(spaces,i));
}



function player_1_or_player_2_play(spaces,space_clicked){
    return () => {
        if(player_clicked_space_already_marked(space_clicked,player_1.which_player))
            return;
        remove_space_clicked_from_free_spaces(space_clicked);
        if(player_1.symbol == "o")
            round_counter++;
        if(round_counter % 2 == 0){
            player_1.put_symbol_on_space(spaces,space_clicked);
            trade_icon_hover_animation(spaces,player_2.symbol);
            trade_turn_icon(player_2.symbol);
        }
        else{
            player_2.put_symbol_on_space(spaces,space_clicked);
            trade_icon_hover_animation(spaces,player_1.symbol);
            trade_turn_icon(player_1.symbol);
        }
        if(round_counter >= 4){
            player_1.check_win(spaces);
            player_2.check_win(spaces);
        }
        if(game_tied()){
            end_game(spaces);
            return;
        }
        if(player_1.symbol == "x")
            round_counter++;
        return;
    }
}



function remove_space_clicked_from_free_spaces(space_removed){
    free_spaces.splice(free_spaces.indexOf(space_removed),1);
    return;
}



function end_game(spaces){
    let end_game_screen = document.getElementById("end-game-screen");
    let next_round_button = document.getElementById("next-round-button");
    setTimeout( () => {
    end_game_screen.style.display = "flex";
    set_styles_to_winner_or_draw_style(next_round_button);
    },500)
}



function reset_game(spaces,end_game_screen){
    return () => {
    let menu_element = document.getElementById("start-menu");
    let board = document.getElementById("board");
    let button_back_menu = document.getElementById("back-menu-button");
    let next_round_button = document.getElementById("next-round-button");
    let select_x_menu = document.getElementById("select-x");
    let select_o_menu = document.getElementById("select-o");
    let vs_cpu_button = document.getElementById("versus-cpu");
    let vs_player_button = document.getElementById("versus-player");
    let cancel_restart_screen_button = document.getElementById("cancel-button");
    let back_menu_restart_screen_button = document.getElementById("restart-back-menu");
    let reset_game_restart_screen_button = document.getElementById("reset-game-button");
    let open_restart_screen_button = document.getElementById("reset-game");
    menu_element.style.display = "flex";
    board.style.display = "none";
    close_restart_screen();
    end_game_screen.style.display = "none";
    round_counter = 0;
    games_tied = 0;
    remove_event(select_x_menu);
    remove_event(select_o_menu);
    remove_event(vs_cpu_button);
    remove_event(vs_player_button);
    remove_event(next_round_button);
    remove_event(button_back_menu);
    remove_event(cancel_restart_screen_button);
    remove_event(back_menu_restart_screen_button);
    remove_event(reset_game_restart_screen_button);
    remove_event(open_restart_screen_button);
    for(let i = 0;i < spaces.length;i++){
    spaces[i].style = "";
    remove_event(spaces[i]);
    }
    menu();
    }
}



function remove_event(element){
    let clone = element.cloneNode(true)
    element.replaceWith(clone);
}



function next_round(spaces,end_game_screen){
    return () => {
    end_game_screen.style.display = "none";
    player_1.won = false;
    player_2.won = false;
    player_1.marks = [];
    player_2.marks = [];
    round_counter = 0;
    free_spaces = [0,1,2,3,4,5,6,7,8];
    if(player_2.is_cpu){
    player_1.possibilities = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    player_2.possibilities = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    player_2.best_possibilities = [null];
    }
    for(let i in spaces)
    spaces[i].style = "";
    trade_turn_icon("x");
    if(player_2.is_cpu){
        if(player_1.symbol == "o"){
            trade_icon_hover_animation(spaces,player_1.symbol);
            player_2.random_play(spaces);
            trade_turn_icon(player_1.symbol);
        }
    }
    update_score_board();
    }
}



function update_score_board(){
    let player_1_score_text = document.getElementById("player-1-score");
    let player_1_score_box = document.getElementById("player-1");
    let player_1_score_points = document.getElementById("player-1-score-points")
    let player_2_score_text = document.getElementById("player-2-score");
    let player_2_score_box = document.getElementById("player-2");
    let player_2_score_points = document.getElementById("player-2-score-points")
    let draws_counter = document.getElementById("draw-counter");
    if(player_1.wins == 0 && player_2.wins == 0){
        player_1_score_text.innerHTML = player_1.symbol + " (PLAYER 1)";
        player_1_score_box.style.backgroundColor = player_1.color[0];
        player_2_score_text.innerHTML = player_2.symbol + " (PLAYER 2)";
        player_2_score_box.style.backgroundColor = player_2.color[0];
        if(player_2.is_cpu)
        player_2_score_text.innerHTML = player_2.symbol + " (CPU)";
    }
    player_1_score_points.innerHTML = player_1.wins;
    player_2_score_points.innerHTML = player_2.wins;
    draws_counter.innerHTML = games_tied;
}



function set_styles_to_winner_or_draw_style(next_round_button){
    let text_color_from_winner = document.getElementsByClassName("player-symbol-color");
    let symbol_win_round = document.getElementById("symbol-won-round");
    let top_text = document.getElementById("end-game-top-text");
    let big_text = document.getElementById("takes-round");
    if(player_1.won){
        symbol_win_round.src = player_1.img_src;
        top_text.innerHTML = '<span id="end-game-top-text">Congratulations, <span class="player-symbol-color" id="winner-player-number">player ' + player_1.which_player + '</span> won the round!</span>';
        big_text.innerHTML = "Takes the round";
        text_color_from_winner[0].style.color = player_1.color[0];
        text_color_from_winner[1].style.color = player_1.color[0];
        next_round_button.style.backgroundColor = player_1.color[0];
        next_round_button.style.borderBottomColor = player_1.color[1];
        player_1.wins++;
        return;
    }
    if(player_2.won){
        if(player_2.is_cpu)
        top_text.innerHTML = '<span id="end-game-top-text"><span class="player-symbol-color" id="winner-player-number">CPU</span> won the round!</span>';
        else
        top_text.innerHTML = '<span id="end-game-top-text">Congratulations, <span class="player-symbol-color" id="winner-player-number">player ' + player_2.which_player + '</span> won the round!</span>';
        big_text.innerHTML = "Takes the round";
        text_color_from_winner[0].style.color = player_2.color[0];
        console.log(text_color_from_winner);
        text_color_from_winner[1].style.color = player_2.color[0];
        symbol_win_round.src = player_2.img_src;
        next_round_button.style.backgroundColor = player_2.color[0];
        next_round_button.style.borderBottomColor = player_2.color[1];
        player_2.wins++;
        return;
    }
    else{
        let tied_color = "#a8bfc9";
        let tied_color_dark = "#858585";
        let container_symbol = document.getElementById("symbol-won-round-container");
        top_text.innerHTML = '<span class="player-symbol-color" id="winner-player-number">THE GAME TIED</span>';
        top_text.style.color = tied_color;
        symbol_win_round.src = "./img/assets/logo.svg";
        big_text.innerHTML = "TIED";
        text_color_from_winner[0].style.color = tied_color;
        text_color_from_winner[1].style.color = tied_color;
        container_symbol.style.justifyContent = "center"
        next_round_button.style.backgroundColor = tied_color;
        next_round_button.style.borderBottomColor = tied_color_dark;
        games_tied++;
        return;
    }
}



menu();

