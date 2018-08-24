<%@page import="java.io.File"%>
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
	String delStr = request.getParameter("delStr");
	String[] titleList = delStr.split(",");
	
	try
	{
		for(int i=0; i<titleList.length; i++){
			File file = new File("/root/Desktop/WPsave/Memo/"+titleList[i]+".txt");
			if(file.exists()){
				file.delete();
			}
		}
	}
	catch (Exception e)
	{
		out.println(e); // 에러가 있다면 메시지 출력
		out.println("파일에 데이터를 쓸 수 없습니다.");
	}
	
	%>
	
	
</body>
</html>