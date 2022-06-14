import React, { useCallback, useEffect, useState } from 'react'
import useLocalStorage from 'hooks/useLocalStorage'
import DatabaseContext, { UpdateProps } from './DatabaseContext'
import Residence, { Member } from 'models/Residence';
import { Meetup } from 'models/Meetup';

import { getFirestore, doc, setDoc, addDoc, collection, getDocs, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; 
import { getFutureDate, hashGroupChat, hashResidence, hashCommunity } from 'hooks/utils';
import useAuth from 'contexts/auth/useAuth';
import GroupChat from 'models/GroupChat';
import Community from 'models/Community';

const db = getFirestore();

const DatabaseProvider = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [residences, setResidences] = useState<{[key: string]: Residence}>({});
  const [meetups, setMeetups] = useState<{[key: string]: Meetup}>({});
  const [communities, setCommunities] = useState<{[key: string]: Community}>({});
  const { user, isAuthenticated } = useAuth();

  const residenceDoc = `residences`;
  const communityDoc = `communities`;

  const addResidence = async (residence: Residence) => {
    if (!isAuthenticated || !user) {
      console.log("[NOT AUTHENTICATED]")
      return;
    }
    try {
      const id: string = await hashResidence(residence);
      residence.group_chats = residence.group_chats.map(gc => ({ ...gc, residenceId: id}))
      const uploadGCIDs = await Promise.all(residence.group_chats.map(gc => hashGroupChat(gc)))
      residence.group_chats = residence.group_chats.map((gc, ind) => ({ ...gc, id: uploadGCIDs[ind], expiration: getFutureDate(6).toISOString()}))

      const resp = await setDoc(doc(db, residenceDoc, id), {
        ...residence,
        id,
        current_residents: [],
        past_residents: [],
        pending_review: true,
        creatorId: user?.id,
      });
      refreshResidences();
      return resp;
    } catch (e) {
      console.log(e, residence);
    }
  }

  const addGroupChat = async (gc: GroupChat) => {
    if (!isAuthenticated || !user) {
      console.log("[NOT AUTHENTICATED]")
      return;
    }
    try {
      console.log(gc)
      gc.id = await hashGroupChat(gc);
      gc.expiration = getFutureDate(6).toISOString()
      let curDoc;
      if (!!gc.residenceId) {
        curDoc = doc(db, residenceDoc, gc.residenceId)
      } else if(!!gc.communityId) {
        curDoc = doc(db, communityDoc, gc.communityId)
      }
      if (!curDoc) {
        console.error("Invalid groupchat object");
        return;
      }
      const res = await updateDoc(curDoc, {
        group_chats: arrayUnion(gc)
      });
      refreshResidences();
      return res;
    } catch (e) {
      console.log(e, gc)
    }
  }

  const deleteGroupChat = async (gc: GroupChat) => {
    if (!isAuthenticated || !user) {
      console.log("[NOT AUTHENTICATED]")
      return;
    }
    try {
      let curDoc;
      if (!!gc.residenceId) {
        curDoc = doc(db, residenceDoc, gc.residenceId)
      } else if(!!gc.communityId) {
        curDoc = doc(db, communityDoc, gc.communityId)
      }
      if (!curDoc) {
        console.error("Invalid groupchat object");
        return;
      }
      const res = await updateDoc(curDoc, {
        regions: arrayRemove(gc)
      });
      refreshResidences();
      return res;
    } catch (e) {
      console.log(e, gc)
    }
  }

  const deleteResidence = async (residence: Residence) => {
    if (!isAuthenticated) {
      console.log("[NOT AUTHENTICATED]")
      return;
    }
    try {
      const res = await deleteDoc(doc(db, residenceDoc, residence.id));
      refreshResidences();
      return res;
    } catch (e) {
      console.log(e, residence);
    }
  }

  const updateResidence = async ({ id, options }: UpdateProps) => {
    if (!isAuthenticated) {
      console.log("[NOT AUTHENTICATED]")
      return;
    }
    try {

    } catch (e) {
      console.log(e, id, options)
    }
  }

  const refreshResidences = async () => {
    const querySnapshot = await getDocs(collection(db, residenceDoc));
    const newRes: {[key: string]: any} = {};
    querySnapshot.forEach(doc => {
      const r = doc.data();
      newRes[r.id] = r as Residence;
    })
    setResidences(newRes);
  }

  const refreshMeetups = async () => {
    setMeetups({});
  }

  const addCommunity = async (community: Community) => {
    if (!isAuthenticated || !user) {
      console.log("[NOT AUTHENTICATED]")
      return;
    }
    try {
      const id: string = await hashCommunity(community);
      community.group_chats = !!community.group_chats ? community.group_chats.map(gc => ({ ...gc, residenceId: id})) : [];
      const uploadGCIDs = await Promise.all(community.group_chats.map(gc => hashGroupChat(gc)))
      community.group_chats = community.group_chats.map((gc, ind) => ({ ...gc, id: uploadGCIDs[ind], expiration: getFutureDate(6).toISOString()}))

      const resp = await setDoc(doc(db, communityDoc, id), {
        ...community,
        id,
        members: [],
        past_members: [],
        pending_review: true,
        creatorId: user?.id,
        creation_timestamp: new Date().toISOString()
      });
      refreshCommunities();
      return resp;
    } catch (e) {
      console.log(e, community);
    }
  }

  const refreshCommunities = async () => {
    const querySnapshot = await getDocs(collection(db, communityDoc));
    const newCom: {[key: string]: any} = {};
    querySnapshot.forEach(doc => {
      const c = doc.data();
      newCom[c.id] = c as Community;
    })
    setCommunities(newCom);
  }

  const deleteCommunity = async (community: Community) => {
    if (!isAuthenticated) {
      console.log("[NOT AUTHENTICATED]")
      return;
    }
    try {
      const res = await deleteDoc(doc(db, communityDoc, community.id));
      refreshCommunities();
      return res;
    } catch (e) {
      console.log(e, community);
    }
  }

  const updateCommunity = async ({ id, options }: UpdateProps) => {
    if (!isAuthenticated) {
      console.log("[NOT AUTHENTICATED]")
      return;
    }
    try {

    } catch (e) {
      console.log(e, id, options)
    }
  }

  const joinCommunity = async (community: Community, duration: number) => {
    if (!isAuthenticated) {
      console.log("[NOT AUTHENTICATED]")
      return;
    }
    try {
      const person = {
        userId: user?.id,
        company_name: user?.company_name,
        expiration: getFutureDate(duration).toISOString()
      } as Member
      const response0 = await updateDoc(doc(db, communityDoc, community.id), {
        members: arrayUnion(person)
      });
      refreshCommunities();
      const response1 = updateDoc(doc(db, communityDoc, community.id), {
        past_members: arrayRemove({ userId: person.userId, company_name: person.company_name })
      });
      return response0;
    } catch (e) {
      console.log(e, community)
    }
  }

  const leaveCommunity = async (community: Community) => {
    if (!isAuthenticated) {
      console.log("[NOT AUTHENTICATED]")
      return;
    }
    try {
      const person = {
        userId: user?.id,
        company_name: user?.company_name,
        expiration: community.members.find(r => r.userId === user?.id)?.expiration
      } as Member
      const response0 = await updateDoc(doc(db, communityDoc, community.id), {
        members: arrayRemove(person)
      });
      refreshResidences();
      const response1 = updateDoc(doc(db, communityDoc, community.id), {
        past_members: arrayUnion({ userId: person.userId, company_name: person.company_name })
      });
      return response0;
    } catch (e) {
      console.log(e, community)
    }
  }

  const joinResidence = async (residence: Residence, duration: number) => {
    if (!isAuthenticated) {
      console.log("[NOT AUTHENTICATED]")
      return;
    }
    try {
      const person = {
        userId: user?.id,
        company_name: user?.company_name,
        expiration: getFutureDate(duration).toISOString()
      } as Member
      const response0 = await updateDoc(doc(db, residenceDoc, residence.id), {
        current_residents: arrayUnion(person)
      });
      refreshResidences();
      const response1 = updateDoc(doc(db, residenceDoc, residence.id), {
        past_residents: arrayRemove({ userId: person.userId, company_name: person.company_name })
      });
      return response0;
    } catch (e) {
      console.log(e, residence)
    }
  }

  const leaveResidence = async (residence: Residence) => {
    if (!isAuthenticated) {
      console.log("[NOT AUTHENTICATED]")
      return;
    }
    try {
      const person = {
        userId: user?.id,
        company_name: user?.company_name,
        expiration: residence.current_residents.find(r => r.userId === user?.id)?.expiration
      } as Member
      const response0 = await updateDoc(doc(db, residenceDoc, residence.id), {
        current_residents: arrayRemove(person)
      });
      refreshResidences();
      const response1 = updateDoc(doc(db, residenceDoc, residence.id), {
        past_residents: arrayUnion({ userId: person.userId, company_name: person.company_name })
      });
      return response0;
    } catch (e) {
      console.log(e, residence)
    }
  }

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([refreshResidences(), refreshCommunities()]);
      setLoading(false);
    }
    init();
  }, [])

  return (
    <DatabaseContext.Provider
      value={{
        loading,
        residences,
        communities,
        meetups,

        refreshResidences,
        addResidence,
        updateResidence,
        deleteResidence,
        joinResidence,
        leaveResidence,

        refreshMeetups,
        addCommunity,
        updateCommunity,
        deleteCommunity,
        joinCommunity,
        leaveCommunity,

        addGroupChat,
        deleteGroupChat
      }}
    >
      {props.children}
    </DatabaseContext.Provider>
  )
}

export default DatabaseProvider;
