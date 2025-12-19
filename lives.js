export async function onRequest(context) {
  // 币安广场直播列表的真实 API 接口
  const apiUrl = "https://www.binance.com/bapi/composite/v1/public/cms/article/list/query";
  
  const payload = {
    "page": 1,
    "pageSize": 20,
    "type": "LIVE"
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1",
        "clienttype": "web",
        "lang": "zh-CN"
      },
      body: JSON.stringify(payload)
    });

    const resData = await response.json();

    // 格式化输出：只提取你需要的字段
    const formattedData = resData.data.map(item => ({
      id: item.id,
      title: item.title,
      cover: item.f_image || item.image, // 封面图
      viewers: item.viewCount || "0",    // 观看次数
      online: item.onlineCount || "0",   // 在线人数
      comments: item.commentCount || "0" // 评论数
    }));

    return new Response(JSON.stringify({ success: true, data: formattedData }), {
      headers: { 
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*" // 允许前端跨域访问
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}