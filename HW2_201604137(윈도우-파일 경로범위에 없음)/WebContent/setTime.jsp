<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.io.IOException"%>
<%@page import="java.io.File"%>
<%@page import="java.io.BufferedWriter"%>
<%@page import="java.io.FileWriter"%>
<%@page import="java.text.*"%>
<%@page import="java.util.*"%>
<%@page import="org.json.simple.JSONObject"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%
	request.setCharacterEncoding("UTF-8");
	
	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd E HH:mm");
	
	BufferedWriter bw = null;
	try
	{
		File file= new File("D:\\java\\WPsave\\Time\\curTime.txt");
		bw = new BufferedWriter(new FileWriter(file));
		
		String curTime = sdf.format(new Date());
		bw.write(curTime);

		JSONObject json = new JSONObject();  
		json.put("curTime", curTime);
		out.print(json.toString());
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
