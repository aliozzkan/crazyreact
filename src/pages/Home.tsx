import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import Layout from "components/templates/Layout";
import { useApp, useAuth } from "hooks/redux-hooks";
import { Hooks } from "services";
import Moment from 'moment'

interface HomePageProps {}

const HomePage: FC<HomePageProps> = (props) => {
  const { user } = useAuth();
  const { appName } = useApp();
  const [msg, setMsg] = useState<string>("message");

  const [postLogin, statLogin, dataLogin] = Hooks.Login();

  const a = new Date();

 

  useEffect(() => {
   setMsg("chaneg")
  }, []);

  return (
    <Layout title="Ana Sayfa">
      <Box>
        <Text>HomePage {user.name}</Text>
        <Text>{appName}</Text>
        {statLogin}
        {msg}
      </Box>
    </Layout>
  );
};

HomePage.defaultProps = {};

export default HomePage;
