import GroupChat from "models/GroupChat";
import Residence from "models/Residence";

async function sha256(msg: string) {
  const msgBuffer = new TextEncoder().encode(msg);                    
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));                
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const formatName = (n: string | undefined) => {
  if (!n) return "";
  return n.split(" ").map(e => `${e.slice(0, 1).toUpperCase()}${e.slice(1)}`).join(" ")
}

const formatAddress = (res: Residence) => {
  return `${res.address}, ${res.city}, ${res.state} ${res.zip}`
}

const getFutureDate = (months: number) => {
  const today = new Date();
  return new Date(today.setMonth(today.getMonth()+months));
}

const hashResidence = async (res: Residence) => {
  const str = res.name + res.address + res.city + res.zip;
  return sha256(str);
}

const hashGroupChat = async (gc: GroupChat) => {
  const str = gc.residenceId + gc.platform + gc.uri
  return sha256(str);
}

export { formatName, formatAddress, hashResidence, hashGroupChat, getFutureDate }