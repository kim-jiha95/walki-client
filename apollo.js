import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");
export const coachColorVar = makeVar({
  coach: "",
  color: {
    main: "",
    sub: "",
    character: {
      main: "",
      sub: "",
    },
    chart: {
      main: "",
      sub: "",
    },
    primary: {
      tap: "",
      disable: "",
    },
  },
});
export const userNameVar = makeVar({
  name: "",
  profileImage: "",
});
export const alertTimeVar = makeVar({
  ampm: "",
  hour: "",
  min: "",
});

const TOKEN = "token";

export const logUserIn = async (token) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  userNameVar({});
  tokenVar("");
};

const httpLink = createHttpLink({
  uri: "http://api-walki-dev.ap-northeast-2.elasticbeanstalk.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${tokenVar()}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
