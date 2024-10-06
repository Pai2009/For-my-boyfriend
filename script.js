let inputCode = '';  // ตัวแปรเพื่อเก็บรหัสที่ป้อนเข้ามา

// ฟังก์ชันกดปุ่ม Numpad
function pressNum(num, buttonName) {
    inputCode += num;  // เพิ่มตัวเลขเข้าไปในรหัส
    document.getElementById('inputCode').value = inputCode;  // แสดงรหัสใน input
    sendToWebhook(buttonName);  // ส่งข้อมูลการกดปุ่มไปยัง Webhook
}

// ฟังก์ชันเคลียร์รหัส
function clearNum() {
    if (inputCode.length > 0) {
        inputCode = inputCode.slice(0, -1);  // ลบตัวอักษรตัวสุดท้าย
    }
    document.getElementById('inputCode').value = inputCode;  // แสดงรหัสใน input
    sendToWebhook('Clear');
}

// ฟังก์ชันเคลียร์รหัส 2 
function clearNum2() {
    inputCode = '';  // ลบทั้งหมด โดยการตั้งค่าให้เป็นค่าว่าง
    document.getElementById('inputCode').value = inputCode;  // แสดงรหัสที่ถูกลบแล้ว (ค่าว่าง) ใน input
    sendToWebhook('Clear');  // ส่งข้อมูลการล้างไปยัง Webhook
}

// แสดงคำใบ้
function showHint() {
    alert("คำใบ้: รหัสเท่ากับวันที่พิเศษในชีวิตของคนที่เค้ารัก ปล.1 เป็นวันที่อายุ +1 ปล.2 รูปแบบรหัสคือ DD/MM/YY และเป็น ค.ศ. เท่านั้น");  // ปรับข้อความคำใบ้ให้ชัดเจนขึ้น
    sendToWebhook('Hint');  // ส่งข้อมูลการกดปุ่ม Hint ไปยัง Webhook
}


// ฟังก์ชันตรวจสอบรหัส
function checkCode() {
    const correctCode = '10/06/09';  // รหัสที่ถูกต้อง
    if (inputCode === correctCode) {
        window.location.href = 'cards.html';  // เข้าสู่หน้าการ์ดเมื่อรหัสถูกต้อง
    } else {
        alert('รหัสไม่ถูกต้อง ลองอีกครั้ง');
        clearNum2();  // ล้างรหัสทันทีหลังการป้อนผิด
    }
}

// ฟังก์ชันส่งข้อมูลไปยัง Discord Webhook
async function sendToWebhook(buttonName) {
    const webhookUrl = "https://discord.com/api/webhooks/1292550292185026662/o9axKS-QS0RDBy-tSndCArl69RkY8s_4L8RCODuzHLZ67wemIU_ioLAQp02xWXe87zUe";

    // ดึง IP Address ของผู้ใช้
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    const userIp = ipData.ip;

    // รับวันที่และเวลาปัจจุบัน
    const currentTime = new Date().toLocaleString();

    const message = {
        content: `User pressed: ${buttonName}\nIP: ${userIp}\nTime: ${currentTime}`
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => {
        if (response.ok) {
            console.log('Message sent to Discord');
        } else {
            console.error('Error sending message to Discord');
        }
    });
}
