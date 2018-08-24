<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.io.IOException"%>
<%@page import="java.io.File"%>
<%@page import="java.io.BufferedWriter"%>
<%@page import="java.io.FileWriter"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>
	<%
	request.setCharacterEncoding("UTF-8");
	String day = request.getParameter("day");
	String title = request.getParameter("title");
	String content = request.getParameter("content");
	String prior = request.getParameter("prior");
	
	FileWriter fw = null;
	BufferedWriter bw = null;
	try
	{
		File file = new File("D:\\java\\WPsave\\Memo\\"+title+".txt");
		fw = new FileWriter(file); 
		bw = new BufferedWriter(fw);
	
		bw.write(day);
	  	bw.newLine(); // 줄바꿈
		bw.write(title);
	  	bw.newLine(); // 줄바꿈
		bw.write(content);
	  	bw.newLine(); // 줄바꿈
		bw.write(prior);
	  	bw.newLine(); // 줄바꿈
	}
	catch (IOException e)
	{
		out.println(e); // 에러가 있다면 메시지 출력
		out.println("파일에 데이터를 쓸 수 없습니다.");
	}
	finally{
		if(bw != null)	bw.close();
	}
		
	
	%>
	
	
</body>
</html>