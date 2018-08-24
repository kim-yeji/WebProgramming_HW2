var YOIL = [ "Mon", "Tue", "Wed", "Thu", "Fri" ];
var COUNT = 0;

function  setFinalTime(){
	  $.ajax({
	      type : "POST",
	      dataType : "json",
	      url : "setTime.jsp",
	      success : function(json) {
	    	  $('#nowDate').text(json.curTime);
	      },
	      error : function(e) {
	             alert('time error');
	      }
	  });
}

function setIBox(cnt, day, title, content, prior){
	iBoxDiv = '<div id="iBox'+cnt+'" class="iBox"  draggable="true" prior="'+prior+'" name="'+title+'" content="'+content+'">';
	iBoxDiv += '<div class="lAr">';
	iBoxDiv += '<input type="checkbox" name="delCheck" class="noClick">';
	iBoxDiv += '<div class="itemC">'+title+'</div>';
	iBoxDiv += '</div>';
	iBoxDiv += '</div>';
	$('.displayArea').sortable({
		  connectWith:'.displayArea'
	});
	$('.displayArea').disableSelection();
	
	$('#'+day).children(':last').append(iBoxDiv);
}

function loadPage(){
	$.ajax({
        type : "POST",
        dataType : "json",
        url : "loadItem.jsp",
        success : function(json) {
      	  if(json.monList.length > 0){
      		  var list = json.monList;
      		  for(var i=1; i<=list.length; i++){
      			$(list).each(function() {
      			  if($(this).attr("prior") == i){
      				setIBox(i, $(this).attr("day"), $(this).attr("title"), $(this).attr("content"), $(this).attr("prior"));
      			  }
      			});
      		  }
      	  }
      	  if(json.tueList.length > 0){
    		  var list = json.tueList;
      		  for(var i=1; i<=list.length; i++){
      			$(list).each(function() {
      			  if($(this).attr("prior") == i){
      				setIBox(i, $(this).attr("day"), $(this).attr("title"), $(this).attr("content"), $(this).attr("prior"));
      			  }
      			});
      		  }
    	  }
      	  if(json.wedList.length > 0){
      		  var list = json.wedList;
      		  for(var i=1; i<=list.length; i++){
      			$(list).each(function() {
      			  if($(this).attr("prior") == i){
      				setIBox(i, $(this).attr("day"), $(this).attr("title"), $(this).attr("content"), $(this).attr("prior"));
      			  }
      			});
      		  }
      	  }
      	  if(json.thuList.length > 0){
      		  var list = json.thuList;
      		  for(var i=1; i<=list.length; i++){
      			$(list).each(function() {
      			  if($(this).attr("prior") == i){
      				setIBox(i, $(this).attr("day"), $(this).attr("title"), $(this).attr("content"), $(this).attr("prior"));
      			  }
      			});
      		  }
      	  }
      	  if(json.friList.length > 0){
      		  var list = json.friList;
      		  for(var i=1; i<=list.length; i++){
      			$(list).each(function() {
      			  if($(this).attr("prior") == i){
      				setIBox(i, $(this).attr("day"), $(this).attr("title"), $(this).attr("content"), $(this).attr("prior"));
      			  }
      			});
      		  }
      	  }
      	  //최종수정시간 가져오기
      	  if(json.curTime == null){
      		$('#nowDate').text("");
      	  }else{
      		$('#nowDate').text(json.curTime);
      	  }
      	  
      	  
        },
        error : function(e) {
               alert('error');
        }
	});
}

function addToDo(){

  layer_open();
  $('#itemDay').show();

  $('#itemDay').val("Mon"); //get&set 동시에
  $('#itemPrior').val("");
  $('#itemName').val("");
  $('#itemContent').val("");

  $('#priorDiv').css("display","none");
  $('#btnLayer').val("Add");
  $('#btnLayer').off("click");
  $('#btnLayer').on('click',function(){
    addItem();
  });
}

function addItem(){

	
	if($('#itemName').val()==""){
		alert('제목을 입력하세요.');
		return;
	}
	if($('#itemContent').val()==""){
		alert('내용을 입력하세요.');
		return;
	}
	
  COUNT++;
  var day = $('#itemDay').val();  //Mon, Tue
  var num = 0;
  if($('#'+day).children(':last').children().length > 0){
	  var pri = $('#'+day).children(':last').children(':last').attr('prior');
	  num = parseInt(pri)+1;
  }
  var iBoxDiv = '<div id="iBox'+COUNT+'" class="iBox"  draggable="true" prior="'+num+'" name="'+$('#itemName').val()+'" content="'+$('#itemContent').val()+'">';
  iBoxDiv += '<div class="lAr">';
  iBoxDiv += '<input type="checkbox" name="delCheck" class="noClick">';
  iBoxDiv += '<div class="itemC">'+$('#itemName').val()+'</div>';
  iBoxDiv += '</div>';
  iBoxDiv += '</div>';
  $('.displayArea').sortable({
	  connectWith:'.displayArea'
  });
  $('.displayArea').disableSelection();
  
  $('#'+day).children(':last').append(iBoxDiv);
  $('#btnClose').click();
 
  //file 저장
  saveItem($('#itemDay').val(), $('#itemName').val(), $('#itemContent').val(), num);
  //최종시간 수정
  setFinalTime();

}

function saveItem(pDay,pTitle,pContent,pPrior){
  //jsp로 전달하는 부분
  $.post("AddItem.jsp",{   //저장
	  	day: pDay,
		title: pTitle,
		content: pContent,
		prior: pPrior
  },function(data){ // 호출하면 html문서가 data를 통해서 코드로 다 들어온다
	  
  });
}

function setPrior(){
  for (var i = 0; i < YOIL.length; i++) {
      var itemList = $('#'+YOIL[i]).children(':last').children();
      if(itemList != null){
    	  var num = 0;
          $(itemList).each(function() {
        	  num = parseInt(num)+1;
        	  $(this).attr('prior', num);
        	  saveItem(YOIL[i], $(this).attr('name'), $(this).attr('content'), num);
          });
      }
  }
  
  //최종시간 수정
  setFinalTime();
}

function delItem(){
  if( $("input:checkbox[name='delCheck']:checked").length == 0 ){
      alert("삭제 할 항목을 한 개 이상 체크해주세요.");
      return;
    }
  //checkbox의 name값이 current_product이면서 체크되어 있는 함수를 each함수로 호출한다.
  
  
  //실제 파일 삭제
  var delList = $("input:checkbox[name='delCheck']:checked").parent().parent();
  var delStr = "";
  for(var i=0; i<delList.length; i++){
	  delStr += $(delList[i]).attr('name');
	  if(i < delList.length -1){
		  delStr += ",";
	  }
  }
  
  $.ajax({
      type : "POST",
      data : {delStr: delStr},
      url : "delItem.jsp",
      success : function(data) {
    	  $("input:checkbox[name='delCheck']:checked").parent().parent().remove();  //메모지삭제
      },
      error : function(e) {
             alert('error');
      },
      complete : function() {
    	  setPrior();
      }
  });
  
  //최종시간 수정
  setFinalTime();
  
}


function modPopup(obj){
  var prior = $(obj).attr('prior');
  var itemName = $(obj).attr('name');
  var itemContent =  $(obj).attr('content');

  layer_open();

  $('#itemDay').hide();
  $('#itemPrior').hide();

  $('#itemName').val(itemName);
  $('#itemContent').val(itemContent);
  $('#btnLayer').val("Done");
  $('#btnLayer').off("click");
  $('#btnLayer').on('click',function(){
    modItem(obj);
  });
}

function modItem(obj){

  if($('#itemName').val()==""){
		alert('제목을 입력하세요.');
		return;
	}
	if($('#itemContent').val()==""){
		alert('내용을 입력하세요.');
		return;
	}

  $(obj).attr('name',$('#itemName').val());
  $(obj).attr('content',$('#itemContent').val());
  $(obj).children(':last').children(':last').text($('#itemName').val());

  $('#btnClose').click();

  //최종시간 수정
  setFinalTime();
}

function searchItem() {
  var itemDay = $('#searchDay').val();
  var itemName = $('#searchItem').val();

  if($.trim(itemName).length==0){
    itemName="";
  }


  $('.iBox').hide();


  if(itemDay !="" && itemName !=""){ //====[1] day검색어와 item검색어 두 개를 이용해서 검색 하고 싶을 때
    for (var i = 0; i < YOIL.length; i++) {
      if (YOIL[i] == itemDay) {
        var itemList = $('#'+YOIL[i]).children(':last').children();

        if (itemList != null) {
          $(itemList).each(function() {
            if($(this).attr('name') == itemName){
              $(this).show();
            }
          });

        }
      }
    }
  }
  else{
    if (itemDay != "") {	//====[2] 요일별로만 검색 하고 싶을 때
      $('#'+itemDay).children(':last').children().show();
    }
    else if (itemName != "") {		  //====[3] Title만 검색 하고 싶을 때
      for (var i = 0; i < YOIL.length; i++) {
        var itemList = $('#'+YOIL[i]).children(':last').children();
        if(itemList != null){
            $(itemList).each(function() {
                if($(this).attr('name') == itemName){
                    $(this).show();
                }
            });
        }
      }
    }else {
      $('.iBox').show();
    }
  }
}



