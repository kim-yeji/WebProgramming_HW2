<%@page import="java.text.SimpleDateFormat"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@page import="java.net.*"%>
<%@page import="java.io.*"%>
<%@page import="java.util.*"%>
<%@page import="org.json.simple.JSONObject"%>

<% 

	List<Map> monList = new ArrayList<Map>();
	List<Map> tueList = new ArrayList<Map>();
	List<Map> wedList = new ArrayList<Map>();
	List<Map> thuList = new ArrayList<Map>();
	List<Map> friList = new ArrayList<Map>();
	
	BufferedReader br = null;
	try
	{
		File file= new File("D:\\java\\WPsave\\Memo");
		File timeFile= new File("D:\\java\\WPsave\\Time\\curTime.txt");
		String[] fileNames = file.list();
		
		for(String name : fileNames){
			br = new BufferedReader(new FileReader(new File("D:\\java\\WPsave\\Memo\\"+name)));
			Map<String,String> map = new HashMap<String,String>();
			map.put("day", br.readLine());
			map.put("title", br.readLine());
			map.put("content", br.readLine());
			map.put("prior", br.readLine());
			if("Mon".equals(map.get("day"))){
				monList.add(map);
			}else if("Tue".equals(map.get("day"))){
				tueList.add(map);
			}else if("Wed".equals(map.get("day"))){
				wedList.add(map);
			}else if("Thu".equals(map.get("day"))){
				thuList.add(map);
			}else if("Fri".equals(map.get("day"))){
				friList.add(map);
			}
		}
	
		JSONObject json = new JSONObject();
		json.put("monList", monList);
		json.put("tueList", tueList);
		json.put("wedList", wedList);
		json.put("thuList", thuList);
		json.put("friList", friList);
		
		if(timeFile.exists()){
			br = new BufferedReader(new FileReader(timeFile));
			json.put("curTime", br.readLine());
		}else{
			FileWriter fw = new FileWriter(timeFile);
			fw.close();
		}
		out.print(json.toString());
		
	}catch(Exception e){
		
	}finally{
		if(br != null)	br.close();
	}

%>

