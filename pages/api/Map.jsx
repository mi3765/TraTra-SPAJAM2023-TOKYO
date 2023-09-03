import React, { useEffect, useRef } from 'react';
import { db } from '@/firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import Button from '@/components/Button';

const Map = () => {
  const iframeRef = useRef(null); // iframe要素への参照

  useEffect(() => {
    // メッセージを処理するためのメッセージハンドラを定義
    const handleMessage = (event) => {
      const locationData = event.data; // locationDataはlatおよびlngプロパティを持つオブジェクトと仮定
      if (locationData && locationData.lat && locationData.lng) {
        // 受信した位置データをここで処理します
        // データを使用して線を引いたり、データに基づいて他のアクションを実行したりします
        // Google Maps APIまたは使用している地図ライブラリへのアクセスが必要です

        // 現時点では、受信したデータをログに記録します
        console.log('Received location data:', locationData);
      }
    };

    // iframeからのメッセージを受信するためのリスナーを設定
    window.addEventListener('message', handleMessage);

    return () => {
      // コンポーネントがアンマウントされたときにイベントリスナーを削除
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleLocationReceived = async () => {
    // iframeからの位置データを要求します（iframeがpostMessageをサポートする場合）
    iframeRef.current.contentWindow.postMessage('get_location_data', '*');
  };

  return (
    <div>
      <div>
        <iframe src="https://storage.googleapis.com/maps-solutions-r95b46dsfz/commutes/cywj/commutes.html"
          width="100%" height="500px"
          style={{ border: "0" }}
          loading="lazy">
        </iframe>
      </div>
      {/* <div onClick={handleLocationReceived} className='mt-4'>
        <Button text="位置情報を取得" />
      </div> */}
    </div>
  );
    }
export default Map;
