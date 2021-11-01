import {
  Authenticator,
  FirebaseCMSApp,
  NavigationBuilder,
} from "@camberi/firecms";
import "typeface-rubik";
import "typeface-space-mono";

import { tbtCollection } from "./collections/tbt";
import { resourceTypeCollection } from "./collections/resourceType";

 const firebaseConfig = {
   apiKey: "AIzaSyCQ6faWwixqUb_jbDJXk8EEcRJUYNxIOCg",
   authDomain: "cms-tbt.firebaseapp.com",
   projectId: "cms-tbt",
   storageBucket: "cms-tbt.appspot.com",
   messagingSenderId: "83044330620",
   appId: "1:83044330620:web:8c60ff0cc7aff2a0522df9",
  };

export default function App() {
  const navigation: NavigationBuilder = async () => {
    return {
      collections: [tbtCollection, resourceTypeCollection],
    };
  };

  const myAuthenticator: Authenticator = async ({ user }) => {
    console.log("Allowing access to", user?.email);
    return true;
  };

  return (
    <FirebaseCMSApp
      name={"IBC TBT"}
      authentication={myAuthenticator}
      navigation={navigation}
      firebaseConfig={firebaseConfig}
      logo={"IBC-Logo-Login.png"}
    />
  );
}
