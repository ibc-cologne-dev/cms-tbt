import {
  Authenticator,
  FirebaseCMSApp,
  NavigationBuilder,
} from "@camberi/firecms";
import "typeface-rubik";
import "typeface-space-mono";

import { tbtCollection } from "./collections/tbt";
import { resourceTypeCollection } from "./collections/resourceType";
import { firebaseConfig } from "./firebase";

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
