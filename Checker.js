let whiteKing = false;
let blackKing = false;
let whitek=null;
let blackk=null;
//player turn function open
function playermove(value){
    let player1 = document.getElementById('player1');
    let messageBox1 = player1.getElementsByClassName('messagebox')[0];
    let whitePiece = document.getElementsByClassName('wpiece');
    if(whiteKing){
        whitek = document.getElementsByClassName('kwpiece');
    }
    // let whiteKing = document.getElementsByClassName('kwpiece');
    let player2 = document.getElementById('player2');
    let messageBox2 = player2.getElementsByClassName('messagebox')[0];
    let blackPiece = document.getElementsByClassName('bpiece');
    if(blackKing){
       blackk = document.getElementsByClassName('kbpiece');
    }
    // let blackKing = document.getElementsByClassName('kbpiece');
   if(value==1){
    // code for player 1 move
playerturn(player1,messageBox1,whitePiece,player2,messageBox2,blackPiece);
playerturnking(whitek,blackk);
   }
   else if(value==2){
playerturn(player2,messageBox2,blackPiece,player1,messageBox1,whitePiece);
playerturnking(blackk,whitek);
   }
}
function playerturn(p1,m1,b1,p2,m2,b2){
    m1.style.display = 'inline-block';
    m1.textContent = 'Your Turn';
    let pm=[...b1];
 let npm=[...b2];
    // Enable pieces for current player
    pm.forEach((piece)=> piece.disabled = false);
    m2.style.display= 'none';
    // Disable pieces for other player
    npm.forEach((piece)=> piece.disabled = true);
}
function playerturnking(king1,king2){
    if(king1!=null){
     let k1=[...king1];   
     k1.forEach((piece)=> piece.disabled = false);
    }
    if(king2!=null){
     let k2=[...king2];
     k2.forEach((piece)=> piece.disabled = true);
    }

}
//player turn function close
//sound function open
let putpiece = new Audio('one-piece-chess.mp3');
let strongcut = new Audio('strong-cut.mp3');
function sound(){
    putpiece.play();
}
function piece_cut(){
    // Play strong cut sound
    strongcut.play();
}
//sound function close
//Devin: Checker JavaScript file
let temp=0;
if(temp==0){
    playermove(1);
    temp=1;
}
// 8*8 array
let rows=8, cols=8;
let board = Array.from({ length: rows }, () => Array(cols).fill(0));

//Get all row elements

let content = document.getElementById('content');
let row1=document.getElementsByClassName('row1')[0];
let row2=document.getElementsByClassName('row2')[0];
let row3=document.getElementsByClassName('row3')[0];
let row4=document.getElementsByClassName('row4')[0];
let row5=document.getElementsByClassName('row5')[0];
let row6=document.getElementsByClassName('row6')[0];
let row7=document.getElementsByClassName('row7')[0];
let row8=document.getElementsByClassName('row8')[0];

// Array of row elements for easier access
let rowElements = [row1, row2, row3, row4, row5, row6, row7, row8];

for(let j=0;j<8;j++){
    for(let i=0;i<8;i++){
        board[j][i] = rowElements[j].children[i];
    }
}
console.log(board);
let takepiece


//function open
function piece_move(takebu, indexof_r,board_Index,column_index){
    if(takebu.className=="wpiece"){
          if(takebu && indexof_r+1==board_Index){
        column_index.appendChild(takebu)
        sound();
        if(board_Index==7){
            createKingPiece(takebu);
            if(whiteKing==false){
                whiteKing=true;
            }
        }
        playermove(2);
    }
    else{
        console.log("piece_move function........ invalid move");
        return;
    }
    }
    else if(takebu.className=="bpiece"){
        if(takebu && indexof_r-1==board_Index){
            column_index.appendChild(takebu)
            sound();
            if(board_Index==0){
                createKingPiece(takebu);
                if(blackKing==false){
                    blackKing=true;
                }
            }
            playermove(1);
        }
        else{
            console.log("piece_move function........ invalid move");
        }
    }  
}
//code for cut pieces
//text content to integer conversion open
function textToInt(text){
    return parseInt(text);
}
//text content to integer conversion close

function column_match(c1,c2)//used two match the colum ,because it used to capture the pieces
{
let a=Number(c1)
let b=Number(c2)
if(a+1==b || a-1==b){
    console.log("column_match........true")
    return true;
}
console.log("column_match........false")
return false;
}
function capturepiece(piece){
    if(piece.className=="bpiece" || piece.className=="kbpiece" || piece.className=="kwpiece" || piece.className=="wpiece"){
        console.log(".............")
piece.remove()
    }
    else{
        console.log("Undefined")
    }

}
//code for find and capture blackpiece ⚫open
function col_find_blackpiece(board,rowIndex,col_value,c,takebu){
    for(let i=0;i<8;i++){
        let a=parseInt(board[rowIndex][i].textContent)
        if(a == col_value){
            if(board[rowIndex][i].children.length > 0){
                if(board[rowIndex][i].children[0].className == "bpiece" || board[rowIndex][i].children[0].className=="kbpiece"){
                    console.log("col_find_blackpiece..........black piece captured");
                    capturepiece(board[rowIndex][i].children[0]);
                    put(c,takebu);
                    piece_cut();
                    let col=textToInt(c.textContent)
                    check_next_move_for_white(board,rowIndex+1,col,takebu)
                    playermove(2);
                }else{
                    console.log("col_find_blackpiece............this is white piece ");
                    return 0;
                }
            }
            else{
                console.log("col_find_blackpiece............piece is not present")
                console.log("colunm="+a+"  Row="+(rowIndex))
                return 0;
            }    
        }
    }
}
//code for find and capture blackpiece ⚫ close
//code for find and capture whitepiece ⚪open
function col_find_whitepiece(board,rowIndex,col_value,c,takebu){
    for(let i=0;i<8;i++){
        let a=parseInt(board[rowIndex][i].textContent)
        if(a == col_value){
            if(board[rowIndex][i].children.length > 0){
                if(board[rowIndex][i].children[0].className == "wpiece" || board[rowIndex][i].children[0].className=="kwpiece"){
                    console.log("col_find_whitepiece..........white piece captured");
                    capturepiece(board[rowIndex][i].children[0]);
                    put(c,takebu);
                    piece_cut();
                    let col=textToInt(c.textContent)
                    check_next_move_for_black(board,rowIndex-1,col,takebu)
                    playermove(1);
                }else{
                    console.log("col_find_whitepiece............this is black piece ");
                    return 0;
                }
            }
            else{
                console.log("col_find_whitepiece............piece is not present")
                console.log("colunm=",a,"  Row=",(rowIndex))
                return 0;
            }    
        }
    }
}
//code for find and capture whitepiece ⚪ close
//code for put piece
function put(col,piece)
{
    col.appendChild(piece);
}
//code for put pieces close





// functions for check next move open
//next move check functions open
//code for next move check for white ⚪player close
function check_next_move_for_white(board,R1,c1,button)
{ 
   console.log("Row1",R1,"\ncolum of R1",c1,button)
   console.log("check_next_move_for_white........Row2 ",R1+1,"C1",c1,"C2",c1+1);
if((R1+1)%2==0 && (R1+1)<8 && (R1+1)>-1){
    let evenodd=null
    evenodd=0
    console.log("evenOdd=",evenodd)
    fetch_R2_c1_c2_for_white(board,R1+1,c1-1,c1,button)
}else{
    let evenodd=null
    evenodd=1
    console.log("evenOdd=",evenodd)
    if(R1+1>7){
        console.log("R2 is last row piece convert to king");
        createKingPiece(button);
        return;
    }
    else {
fetch_R2_c1_c2_for_white(board,R1+1,c1,c1+1,button)
    }
    
}  
}
//check R2 open
function fetch_R2_c1_c2_for_white(board,R2,c1,c2,button){
    let i1=-1
    let i2=-1
    if(R2 ==7 || R2==0){
        console.log("no check, next player chance");
        playermove(2);
    }else{
        for(let i=0;i<8;i++){
            
            let a=parseInt(board[R2][i].textContent)
            if(a == c1 ){// check r2 is empty or not open
                if(board[R2][i].children.length > 0){
                    if(board[R2][i].children[0].className=="bpiece" || board[R2][i].children[0].className=="kbpiece"){
                       let value = parseInt(board[R2][i].textContent);
                        if(i!=0 && i!=7){//check the colunm position
                            console.log(" check",i)
                            i1=i-1
                        }
                        else{console.log("no check")
                         playermove(2)   
                        }
                    }else{
                        console.log("fetch_R2_c1_c2_for_white....this is  white piece in R2 C1=",board[R2][i].children[0]);
                    }   
                }
            }else if(a==c2){
                if(board[R2][i].children.length > 0){
                    if(board[R2][i].children[0].className=="bpiece" || board[R2][i].children[0].className=="kbpiece"){
                        let value = parseInt(board[R2][i].textContent);
                        if(i!=0 && i!=7){
                            console.log(" check",i)
                            i2=i+1
                        }
                        else{console.log("no check")
                            playermove(2)
                        }
                    }else{
                        console.log("fetch_R2_c1_c2_for_white....this is  white piece in R2 C2=",board[R2][i].children[0]);
                    }   
                } 
            }
        }

    }  
    fetch_R3_c1_c2(board,R2+1,i1,i2,1);
}
//check R2 close
//code for next move check for white ⚪player close
//check R3 open
function fetch_R3_c1_c2(board,R3,i1,i2,value){//check last row for player move open
console.log("fetch_R3_c1_c2",R3,i1,i2);
if(i1==-1 && i2==-1){
    // console.log("fetch_R3_c1_c2....Next move not  your");
    if(value==1){
        playermove(2);
    }else if(value==2){
        playermove(1);
    }
}
else if(i1>-1 &&i2>-1){
    if(board[R3][i1].children.length==0 || board[R3][i2].children.length==0){
        console.log("fetch_R3_c1_c2....Next move is your",board[R3][i1],board[R3][i2]);
        playermove(value);
    }
    else{
        console.log("fetch_R3_c1_c2....Next move not your",board[R3][i1],board[R3][i2]);
        if(value==1){
        playermove(2);
    }else if(value==2){
        playermove(1);
    }
    }
}
else if(i1>-1){
    if(board[R3][i1].children.length==0){
        console.log("fetch_R3_c1_c2....Next move is your");
        playermove(value);
    }else{
        console.log("fetch_R3_c1_c2....Next move not your");
        if(value==1){
        playermove(2);
    }else if(value==2){
        playermove(1);
    }
    }
}
else if(i2>-1){
    if(board[R3][i2].children.length==0){
        console.log("fetch_R3_c1_c2....Next move is your");
        playermove(1);
    }else{
        console.log("fetch_R3_c1_c2....Next move not your");
        if(value==1){
        playermove(2);
    }else if(value==2){
        playermove(1);
    }
    }
}
}//check last row for player move close
//check R3 close


//code for next move check for black ⚫player open
function check_next_move_for_black(board,R1,c1,button)
{
    if(R1==0){
        // console.log("R1 is first row piece convert to king");
        createKingPiece(button);
        return;
    }
   console.log("Row1",R1,"\ncolum of R1",c1)
   console.log("check_next_move_for_black........Row2 ",R1-1,"C1",c1,"C2",c1+1);
if((R1+1)%2==0 && (R1+1)<8 && (R1+1)>-1){
    let evenodd=null
    evenodd=0
    console.log("evenOdd=",evenodd)
    fetch_R2_c1_c2_for_black(board,R1-1,c1-1,c1,button)
}else{
    let evenodd=null
    evenodd=1
    console.log("evenOdd=",evenodd)
    if(R1-1==0){
        console.log("R2 is last row piece convert to king");
        createKingPiece(button);
        return;
    }
    else{
fetch_R2_c1_c2_for_black(board,R1-1,c1,c1+1,button)
    }
    
}  
}
//check R2 open
function fetch_R2_c1_c2_for_black(board,R2,c1,c2,button){
    let i1=-1
    let i2=-1
    if(R2 >=7 || R2<=0){
        // console.log("no check, next player chance");
        playermove(1);
    }else{
        for(let i=0;i<8;i++){ 
            // console.log("fetch_R2_c1_c2_for_black..........",R2)  
            let a=parseInt(board[R2][i].textContent)
            if(a == c1 ){// check r2 is empty or not open
                if(board[R2][i].children.length > 0){
                    if(board[R2][i].children[0].className=="wpiece" || board[R2][i].children[0].className=="kwpiece"){
                       let value = parseInt(board[R2][i].textContent);
                        if(i!=0 && i!=7){//check the colunm position
                            console.log(" check",i)
                            i1=i-1
                        }
                        else{console.log("no check")
                           playermove(1) 
                        }
                    }else{
                        console.log("fetch_R2_c1_c2_for_black....this is  black piece in R2 C1=",board[R2][i].children[0]);
                    }   
                }
            }else if(a==c2){
                if(board[R2][i].children.length > 0){
                    if(board[R2][i].children[0].className=="wpiece" || board[R2][i].children[0].className=="kwpiece"){
                        let value = parseInt(board[R2][i].textContent);
                        if(i!=0 && i!=7){
                            console.log(" check",i)
                            i2=i+1
                        }
                        else{console.log("no check")
                           playermove(1)}
                    }else{
                        console.log("fetch_R2_c1_c2_for_black....this is  black piece in R2 C2=",board[R2][i].children[0]);
                    }   
                } 
            }
        }
    }  
    fetch_R3_c1_c2(board,R2-1,i1,i2,2);
}
//check R2 close
//code for next move check for black ⚫player close


//Next move check close
//functions for check next move close






//function close
let takebu=null //take button element
let indexOf_r=null //index of row where take button is present
let takeText=null //store text value as number
let colunm_index=null //index of column where piece is capture and store colunm text as number  
let classname=null //store class name of element
// used board design open 


//take piece code open
board.forEach((r)=>{
   r.forEach((c)=>{
       if(c.className=="Bblo"){
           c.addEventListener('click', (e) => {
            if(e.target.tagName=="BUTTON"){
                classname=e.target.className;
let give=c.textContent;
takeText=parseInt(give);
                indexOf_r=board.indexOf(r);
                col_index=r.indexOf(c);
               takebu = e.target;
            }
           });
       }//if close
   })//forEach close of c
})//forEach close of r
//take piece code close

//put piece code open
board.forEach((r)=>{  
    r.forEach((c)=>{
        if(c.className=="Bblo") //for div element of black color "Bblo is black color div"
            {
            c.addEventListener('click', (e) => {
                let Text_content=c.textContent;
                let text_num=parseInt(Text_content);//value of column where piece is put
                

                if(indexOf_r!=board.indexOf(r)){ //if takepiece not in current row
                   if((board.indexOf(r)+1)%2==0){
                    if(takeText==text_num || (takeText+1)==text_num)//for make legal move
                    { 
                        if(c.children.length==0)// if cell already has a child, don't allow move
                            {
                                let board_index=board.indexOf(r)
                                if(takebu.tagName="Button"){piece_move(takebu, indexOf_r, board_index, c);}     
                        }//if close (cell already has a child)
             
                   } //if close (make movement of pieces in every row in this pieces move only in nearest row)
                   }
                   else if((board.indexOf(r)+1)%2==1){
                    if(takeText==text_num || (takeText-1)==text_num)//for make legal move
                    { 
                        if(c.children.length==0)// if cell already has a child, don't allow move
                            {
                                let board_index=board.indexOf(r)
                              if(takebu.tagName="Button"){piece_move(takebu, indexOf_r, board_index, c);}     
                        }//if close (cell already has a child)
             
                   } //if close (make movement of pieces in every row in this pieces move only in nearest row)
                   }
                   
                  
                }// if close (takepiece not in current row)
            });
        }
    });

})// forEach close of r
//put piece code close

// code for capture the pieces 🤺 open
//for white ⚪open
board.forEach((r)=>{
   r.forEach((c)=>{
    if(c.className=="Bblo"){
        // checker: Add capture logic here
        c.addEventListener('click',(e)=>{
            if(classname=="wpiece"){              
if(indexOf_r+2 === board.indexOf(r)){
    if(column_match(takeText, e.target.textContent)){
                if(c.children.length==0){
                    // console.log("there is no button put piece here",c)
                    let R3_C_value=textToInt(e.target.textContent)
console.log("colunm element",R3_C_value)
if((indexOf_r+1)%2==0 )//main condition which used for capture piece open
    {
    let smaller = (takeText < R3_C_value) ? takeText : R3_C_value;
    // console.log("smaller", smaller);
    col_find_blackpiece(board, indexOf_r+1, smaller,c,takebu); 
    takebu=null;
    classname=null;
    
}else{
    let larger = (takeText > R3_C_value) ? takeText : R3_C_value;
    //  console.log("larger", larger);
    col_find_blackpiece(board, indexOf_r+1, larger,c,takebu);
    takebu=null
    classname=null
    
      
}//main condition which used for capture black piece open
//checker:Add capture logic here in this fetch colunm close
                }
            }
            }
            // checker: Implement capture logic    
        }
    })//c close
    }//if close (c.className=="Bblo")
   }) //r.close
}) //row side ⚪close

 // for white close 
 // for black⚫ open
board.forEach((r)=>{
   r.forEach((c)=>{
    if(c.className=="Bblo"){
        // checker: Add capture logic here
        c.addEventListener('click',(e)=>{
            if(classname=="bpiece"){
                
if(indexOf_r-2 === board.indexOf(r)){
    if(column_match(takeText,c.textContent)){//check the player not put in wrong colunm
                if(c.children.length==0){

                    let R3_C_value=textToInt(e.target.textContent)
console.log("colunm element",R3_C_value)
if((indexOf_r+1)%2==0 )//main condition which used for capture piece open
    {
    let smaller = (takeText < R3_C_value) ? takeText : R3_C_value;
    // console.log("smaller", smaller);
    col_find_whitepiece(board, indexOf_r-1, smaller,c,takebu); 
    takebu=null
    classname=null
}else{
    let larger = (takeText > R3_C_value) ? takeText : R3_C_value;
    // console.log("odd colunm");
    //  console.log("larger", larger);
     console.log(takebu)
    col_find_whitepiece(board, indexOf_r-1, larger,c,takebu);
    takebu=null
    classname=null
      
}//main condition which used for capture black piece open
//checker:Add capture logic here in this fetch colunm close
                }
            }
            }
            }
            // checker: Implement capture logic  
        })
    }
   })
}) //row side close
  //for black⚫ close      
//code for capture  the black piece pieces 🤺 close
  
//used board design close

//king piece code open
let col_index;//for find the column index
//indexOf_r;//for find the row index
//sound for king move open
let king_movie=new Audio("king_move.mp3");
let king_spone=new Audio("king_spone.mp3");
let king_cap=new Audio("king_capture.mp3");
function playKingSound(){king_movie.play();}
function KingSpone(){king_spone.play();}
function KingCapture(){king_cap.play();}
//sound for king move close

board.forEach((r)=>{
    r.forEach((c)=>{
c.addEventListener('click',(e)=>{//put condition open
if(takebu && (takebu.className=="kbpiece" || takebu.className=="kwpiece")){
if(indexOf_r+1 ==board.indexOf(r) || indexOf_r-1 ==board.indexOf(r)){
    if(col_index+1 ==r.indexOf(c) || col_index-1 ==r.indexOf(c)){
        if(c.children.length==0){
    playKingSound();
    put(e.target,takebu);
    if(takebu.className=="kbpiece"){
    playermove(1);
    takebu=null;
    }else{
    playermove(2);
    takebu=null;
    }
}
}
}//put condition close
else if(indexOf_r+2==board.indexOf(r) && col_index+2==r.indexOf(c)){
    console.log("true1")
    KingCapture(indexOf_r+2,col_index+2,1,1);return 0;
}
else if(indexOf_r+2==board.indexOf(r) && col_index-2==r.indexOf(c)){
    console.log("true2")
    KingCapture(indexOf_r+2,col_index-2,1,-1);return 0;
}
else if(indexOf_r-2==board.indexOf(r) && col_index+2==r.indexOf(c)){
    console.log("true3")
    KingCapture(indexOf_r-2,col_index+2,-1,1);return 0;
}
else if(indexOf_r-2==board.indexOf(r) && col_index-2==r.indexOf(c)){
    console.log("true4")
    KingCapture(indexOf_r-2,col_index-2,-1,-1);return 0;
}
}
    })//event listener close
})//row close
})//board close

// king capture piece code open
function KingCapture(R3,C3,r_num,col_num) {
    if(r_num==1 && col_num==1){
        if(board[R3-1][C3-1].children.length>0){
           if(CheckPieceIsNotSameColor(board[R3-1][C3-1].children[0], takebu)){
            KingCapture();
board[R3-1][C3-1].children[0].remove()
put(board[R3][C3],takebu);
CheckNextChanceForKing(R3,C3);
           }
        }
      }
    else if(r_num==1 && col_num==-1){
        if(board[R3-1][C3+1].children.length>0){
           if(CheckPieceIsNotSameColor(board[R3-1][C3+1].children[0], takebu)){
            KingCapture();
board[R3-1][C3+1].children[0].remove()
put(board[R3][C3],takebu);
CheckNextChanceForKing(R3,C3);
           }
        }
      }
    else if(r_num==-1 && col_num==1){
        if(board[R3+1][C3-1].children.length>0){
           if(CheckPieceIsNotSameColor(board[R3+1][C3-1].children[0], takebu)){
            KingCapture();
board[R3+1][C3-1].children[0].remove()
put(board[R3][C3],takebu);
CheckNextChanceForKing(R3,C3);
           }
        }
      }  
    else if(r_num==-1 && col_num==-1){
        if(board[R3+1][C3+1].children.length>0){
           if(CheckPieceIsNotSameColor(board[R3+1][C3+1].children[0], takebu)){
            KingCapture();
board[R3+1][C3+1].children[0].remove()
put(board[R3][C3],takebu);
CheckNextChanceForKing(R3,C3);
           }
        }
      }
}
//king capture piece code close
//check piece is not same color open
function CheckPieceIsNotSameColor(p1,p2) {
    if(p2.className=="kbpiece" && (p1.className=="kwpiece" || p1.className=="wpiece")){
        return true;
    }
    if(p2.className=="kwpiece" && (p1.className=="kbpiece" || p1.className=="bpiece")){
        return true;
    }
    else{
        return false;
    }
}
//check piece is not same color close
//check next chance for king open
function same(takebu) {   
    if(takebu.className=="kbpiece") {
        playermove(2);
    } else if(takebu.className=="kwpiece") {
        playermove(1);
    }
}
function CheckNextChanceForKing(R,C) {
    if(R+2 < 8 && C+2 < 8 && board[R+2][C+2].children.length == 0 && board[R+1][C+1].children.length > 0 
        && CheckPieceIsNotSameColor(board[R+1][C+1].children[0], takebu)){
console.log("CheckNextChanceForKing");
same(takebu);
    }
   else if(R+2 < 8 && C-2 >= 0 && board[R+2][C-2].children.length == 0 && board[R+1][C-1].children.length > 0 &&
        CheckPieceIsNotSameColor(board[R+1][C-1].children[0], takebu)){
console.log("CheckNextChanceForKing");
same(takebu);
    }
    else if(R-2 >= 0 && C+2 < 8 && board[R-2][C+2].children.length == 0 && board[R-1][C+1].children.length > 0 &&
        CheckPieceIsNotSameColor(board[R-1][C+1].children[0], takebu)){
console.log("CheckNextChanceForKing");
same(takebu);

    }
    else if(R-2 >= 0 && C-2 >= 0 && board[R-2][C-2].children.length == 0 && board[R-1][C-1].children.length > 0 &&
        CheckPieceIsNotSameColor(board[R-1][C-1].children[0], takebu)){
console.log("CheckNextChanceForKing");
same(takebu);
    }
    else{
        console.log("No next chance for king");
        if(takebu.className=="kbpiece") {
            playermove(1);
        } else if(takebu.className=="kwpiece") {
            playermove(2);
        }
        return;
    }
}//CheckNextChanceForKing close
//check next chance for king close
//create king piece open
function createKingPiece(piece) {
    if(piece.className=="bpiece") {
        KingSpone();
        piece.className="kbpiece";
    }
    else if(piece.className=="wpiece") {
        KingSpone();
        piece.className="kwpiece";
    }
}
//create king piece close
//king piece code close

//control setting open
const screen_cover=document.getElementById('cover_screen');
function ScreenCover() {
    if(screen_cover.style.display == 'block') {
        screen_cover.style.display = 'none';
    } else {
        screen_cover.style.display = 'block';
    }
}
function re_arrangeBoard() {
     let btn = document.createElement("button");
    for(let i=0; i<8; i++) {
if(i==0 ||i==1||i==2) {
    btn.className = "wpiece";
        board[i].forEach((cell) => {
        if (cell.className === "Bblo") {
            // Delay each placement by 1 second * index 
                btn.textContent = "S";
                let bbtn = btn.cloneNode(true);
                put(cell,bbtn);
            }
        });
} else if(i==5||i==6||i==7) {
    btn.className = "bpiece";
        board[i].forEach((cell) => {
        if (cell.className === "Bblo") {
            // Delay each placement by 1 second * index 
                btn.textContent = "S";
                let bbtn = btn.cloneNode(true);
                put(cell,bbtn);
            }
        });
}

    }
}
function clearBoard() {
    ScreenCover();
        board.forEach(row => {
        row.forEach(cell => {
            if(cell.children.length > 0) {
                cell.children[0].remove();
            }
        });
    });
    re_arrangeBoard()
}
const rematchButton = document.querySelector('.rematch');
rematchButton.addEventListener('click', () => {
clearBoard()
});
const resume_cross_menu=[document.querySelector('.cross'),
    document.querySelector('.menu'),
    ...document.querySelectorAll('.resume')
];
resume_cross_menu.forEach(menu => {
    menu.addEventListener('click', () => {
        ScreenCover();
    });
});
//control setting close