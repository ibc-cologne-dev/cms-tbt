import {
  AuthDelegate,
  Authenticator,
  CircularProgressCenter,
  createCMSDefaultTheme,
  FireCMS,
  FirebaseLoginView,
  NavigationBuilder,
  useFirebaseAuthDelegate,
  useFirebaseStorageSource,
  useFirestoreDataSource,
  useInitialiseFirebase,
  Scaffold,
  NavigationRoutes,
  SideEntityDialogs,
} from "@camberi/firecms";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { BrowserRouter as Router } from "react-router-dom";
import "typeface-rubik";
import "typeface-space-mono";

import { tbtCollection } from "./collections/tbt";
import { resourceTypeCollection } from "./collections/resourceType";
import { audioCollection } from "./collections/audio";
import { firebaseConfig } from "./firebase";

const app = initializeApp({ ...firebaseConfig });
const db = getFirestore(app);

const getUser = async (uid: string) => {
  const userDocRef = await doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  return userDoc;
};

const theme = createCMSDefaultTheme({
  mode: "light",
  primaryColor: "#044953",
  secondaryColor: "#e17b24",
});

export default function App() {
  const {
    firebaseApp,
    firebaseConfigLoading,
    configError,
    firebaseConfigError,
  } = useInitialiseFirebase({ firebaseConfig });

  const authDelegate: AuthDelegate = useFirebaseAuthDelegate({
    firebaseApp,
  });

  const navigation: NavigationBuilder = async () => {
    return {
      collections: [tbtCollection, resourceTypeCollection, audioCollection],
    };
  };

  const dataSource = useFirestoreDataSource({
    firebaseApp: firebaseApp,
  });
  const storageSource = useFirebaseStorageSource({ firebaseApp: firebaseApp });

  const auth: Authenticator = async ({ user }) => {
    const uid = user?.uid;
    console.log("uid", uid);

    if (!uid) {
      return false;
    }

    const userDoc = await getUser(uid);

    return uid === userDoc.id;
  };

  if (configError) {
    return <div> {configError} </div>;
  }

  if (firebaseConfigError) {
    return (
      <div>
        It seems like the provided Firebase config is not correct. If you are
        using the credentials provided automatically by Firebase Hosting, make
        sure you link your Firebase app to Firebase Hosting.
      </div>
    );
  }

  if (firebaseConfigLoading || !firebaseApp) {
    return <CircularProgressCenter />;
  }

  return (
    <Router>
      <FireCMS
        authDelegate={authDelegate}
        dataSource={dataSource}
        storageSource={storageSource}
        entityLinkBuilder={({ entity }: any) =>
          `https://console.firebase.google.com/project/${firebaseApp.options.projectId}/firestore/data/${entity.path}/${entity.id}`
        }
        authentication={auth}
        navigation={navigation}
      >
        {({ context, loading }: any) => {
          let component;
          if (loading) {
            component = <CircularProgressCenter />;
          } else if (!context.authController.canAccessMainView) {
            component = (
              <FirebaseLoginView
                skipLoginButtonEnabled={false}
                signInOptions={[GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD]}
                firebaseApp={firebaseApp}
                authDelegate={authDelegate}
              />
            );
          } else {
            component = (
              <Scaffold name={"IBC TBT"} logo={"logo.png"}>
                <NavigationRoutes />
                <SideEntityDialogs />
              </Scaffold>
            );
          }

          return (
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {component}
            </ThemeProvider>
          );
        }}
      </FireCMS>
    </Router>
  );
}
