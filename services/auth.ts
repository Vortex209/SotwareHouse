import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "./firebase";

export async function cadastrarUsuario(
  email: string,
  senha: string
) {
  const resultado = await createUserWithEmailAndPassword(
    auth,
    email,
    senha
  );

  const usuario = resultado.user;

  await setDoc(doc(db, "users", usuario.uid), {
    email: usuario.email,
    tipo: "aluno",
    criadoEm: serverTimestamp(),
  });

  return usuario;
}

export async function entrarComEmail(
  email: string,
  senha: string
) {
  const resultado = await signInWithEmailAndPassword(
    auth,
    email,
    senha
  );

  return resultado.user;
}

export async function entrarComGoogle() {
  const provider = new GoogleAuthProvider();

  const resultado = await signInWithPopup(auth, provider);

  return resultado.user;
}

export async function sair() {
  await signOut(auth);
}

export function observarUsuario(
  callback: (usuario: User | null) => void
) {
  return onAuthStateChanged(auth, callback);
}

export async function buscarDadosUsuario() {
  const usuario = auth.currentUser;

  if (!usuario) {
    return null;
  }

  const referencia = doc(db, "users", usuario.uid);
  const resultado = await getDoc(referencia);

  if (resultado.exists()) {
    return resultado.data();
  }

  return null;
}

export function mensagemErroAuth(codigo: string): string {
  switch (codigo) {
    case "auth/invalid-email":
      return "O e-mail informado não é válido.";

    case "auth/user-not-found":
      return "Não encontramos uma conta com esse e-mail.";

    case "auth/wrong-password":
      return "A senha está incorreta.";

    case "auth/invalid-credential":
      return "E-mail ou senha incorretos.";

    case "auth/email-already-in-use":
      return "Este e-mail já está cadastrado.";

    case "auth/weak-password":
      return "A senha é muito fraca. Escolha uma senha mais segura.";

    case "auth/missing-password":
      return "Digite uma senha.";

    case "auth/network-request-failed":
      return "Não foi possível conectar ao servidor. Verifique sua internet.";

    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente mais tarde.";

    default:
      return "Não foi possível realizar a operação. Tente novamente.";
  }
}