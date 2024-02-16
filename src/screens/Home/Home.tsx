import {
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { RootStackParamList } from "../../navigation/RootStackNavigator";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BookQueryResponse } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";
import { addBook, clearAllBook } from "../../redux/slice/BookListSlice";
import Book from "../../components/Book";
import throttle from "lodash.throttle";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
const Home = ({ navigation }: HomeScreenProps) => {
  const ws = useRef<WebSocket | null>(null);
  const WEB_SOC_DATA = {
    event: "subscribe",
    prec: "P0",
    freq: "F1",
    confEventFlag: 536870912,
    channel: "book",
    symbol: "tBTCUSD",
  };
  const [precison, setPrecision] = useState(0);
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books);

  //Functions
  const connectWebSocket = () => {
    ws.current = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    let msg = JSON.stringify({ ...WEB_SOC_DATA, prec: `P${precison}` });

    ws.current.onopen = () => {
      ws.current?.send(msg);
    };
    ws.current.onmessage = throttle((event) => {
      console.log("WebSocket message:", event.data);
      let res = JSON.parse(event.data) as BookQueryResponse; // JSON PARSE THE DATA

      dispatch(addBook(res));
    }, 1000);

    ws.current.onclose = (event) => {
      console.log("WebSocket closed:", event.code, event.reason);
      // Attempt to reconnect when closed
      // setTimeout(connectWebSocket, 3000);
    };
    ws.current.onerror = (event) => {
      console.error("WebSocket error:", JSON.stringify(event));
    };
  };

  const disconnectWebSocket = () => {
    if (ws.current) {
      ws.current.close();
    }
  };

  const renderRows: ListRenderItem<string[]> | null | undefined = ({
    item,
    index,
  }) => {
    return <Book amount={item[1]} price={item[0]} key={index} />;
  };

  const renderBookList = () => {
    if (!books) {
      return null;
    }

    // Assuming 'state' is an instance of BookListState
    const mySetKeys = Object.keys(books.mySet);
    let tablearr = [["Price", "Amount"]];
    mySetKeys.forEach((key) => {
      const value = books.mySet[key];
      if (value && value[0] && value[1]) {
        tablearr.push([value[0].toString(), value[1].toString()]);
      }
    });

    return (
      <FlatList
        data={tablearr}
        initialNumToRender={5}
        renderItem={renderRows}
      />
    );
  };

  const decreasePrecision = () => {
    let count = precison;
    count = count - 1;
    count = count < 0 ? 0 : count;
    setPrecision(count);
  };

  const increasePrecision = () => {
    let count = precison;
    count = count + 1;
    count = count > 5 ? 5 : count;
    setPrecision(count);
  };

  useEffect(() => {
    const handleConnectivityChange = (state: NetInfoState) => {
      if (state.isConnected) {
        // Reconnect when network connectivity is back
        setTimeout(() => connectWebSocket(), 500);
      } else {
        // Close WebSocket when network is disconnected
        disconnectWebSocket();
      }
    };

    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);

    return () => {
      disconnectWebSocket();
      unsubscribe();
    };
  }, []);

  //handle update to precision
  useEffect(() => {
    let data = JSON.stringify({
      ...WEB_SOC_DATA,
      prec: `P${precison}`,
    });

    //clear all market data from store
    dispatch(clearAllBook());
    ws.current?.send(data);
  }, [precison]);

  return (
    <View>
      <View style={styles.connectCtn}>
        <Button title="Connect" onPress={connectWebSocket} />
        <Button title="Disconnect" onPress={disconnectWebSocket} />
      </View>
      <Text style={styles.currency}>tBTCUSD</Text>
      <View style={styles.precisionCtn}>
        <Button title="Increase Precision" onPress={increasePrecision} />
        <Button title="Decrease Prescision" onPress={decreasePrecision} />
      </View>
      <Button title="Increase Precision" />
      {renderBookList()}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  precisionCtn: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  connectCtn: {
    marginTop: 10,
    marginBottom: 10,
  },
  currency: {
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
});
