# https://github.com/isaackogan/TikTokLive
from TikTokLive import TikTokLiveClient
from TikTokLive.types.events import CommentEvent, ConnectEvent, FollowEvent, ShareEvent, ViewerCountUpdateEvent, SubscribeEvent, LiveEndEvent, LikeEvent, JoinEvent, GiftEvent, DisconnectEvent
from TikTokLive.types.errors import FailedConnection, LiveNotFound
from TikTokLive.types import User
import datetime
import time
import requests

api_url_stream = 'http://localhost:8080/stream'
api_url_dashboard_viewer_count = 'http://localhost:8080/viewer_count'
api_url_dashboard_max_viewer_count = 'http://localhost:8080/max_viewer_count'
api_url_dashboard_like_count = 'http://localhost:8080/like_count'
api_url_dashboard_follower_count = 'http://localhost:8080/follower_count'
api_url_dashboard_sub_count = 'http://localhost:8080/sub_count'
api_url_dashboard_share_count = 'http://localhost:8080/share_count'
api_url_dashboard_comment_count = 'http://localhost:8080/comment_count'
api_url_dashboard_comment = 'http://localhost:8080/comment'
api_url_dashboard_gift_count = 'http://localhost:8080/gift_count'
api_url_dashboard_gift = 'http://localhost:8080/gift'
api_url_dashboard_coin_count = 'http://localhost:8080/coin_count'
api_url_dashboard_join_count = 'http://localhost:8080/join_count'
api_url_dashboard_connected_state = 'http://localhost:8080/connected_state'
api_url_dashboard_live_start_hour = 'http://localhost:8080/live_start_hour'

# Nom du live auquel vous souhaitez vous connectez
liveName = "cedriccommelabd"
# Streamers de tests : topparty1 cedriccommelabd tiibox d.fdetalles_pirograbados

# Variables de statistiques
nbFollow = 0
nbLike = 0
nbSub = 0
nbShare = 0
nbJoin = 0
nbComment = 0
nbGift = 0
nbCoin = 0
maxViewers = 0
lastNbViewers = 0
girlCounter = 0
boyCounter = 0
heureDebutLive = ""
dateDebutLive = ""
dateFinLive = ""
lastLikedUser = ""
lastJoinHour = ""
lastCommentHour = ""
gifts = []
connected = False

# Constantes 
ratioRevenu = 0.01285714286
ratioRevenuTel = 0.01785714286

# Connexion au live
client: TikTokLiveClient = TikTokLiveClient(unique_id="@"+liveName, **({"enable_extended_gift_info": True, "lang": "fr-FR"}))

# Lorsqu'on se connecte au live
@client.on("connect")
async def on_connect(_: ConnectEvent):
    now = datetime.datetime.now()
    global heureDebutLive
    global dateDebutLive
    global gifts
    global connected
    dateDebutLive = now
    heureDebutLive = dateDebutLive.strftime("%Hh%Mm")
    for gift in client.available_gifts.values():
        gifts.append({"name" : gift.name, "coin_value" : gift.diamond_count, "image_url": gift.icon.url_list[0]})
    print(f"{heureDebutLive} : Connecté au live.")
    connected = True
    payload = {'live_start_hour': heureDebutLive}
    requests.post(api_url_dashboard_live_start_hour, json = payload)
    payload = {'connected_state': connected}
    requests.post(api_url_dashboard_connected_state, json = payload)

@client.on("disconnect")
async def on_disconnect(event: DisconnectEvent):
    global connected
    print("Déconnecté du live.")
    stats()
    connected = False
    payload = {'connected_state': connected}
    requests.post(api_url_dashboard_viewer_count, json = payload)

# Lorsque le compteur de viewers se met à jour
@client.on("viewer_count_update")
async def on_connect(event: ViewerCountUpdateEvent):
    global connected
    if (connected == True):
        now = datetime.datetime.now().strftime("%H:%M:%S")
        global maxViewers
        global lastNbViewers
        if (maxViewers < event.viewerCount):
            maxViewers = event.viewerCount
        if (event.viewerCount != lastNbViewers):
            lastNbViewers = event.viewerCount 
            print(f"{now} : Viewers :", event.viewerCount)
            payload = {'viewer_count': event.viewerCount}
            requests.post(api_url_dashboard_viewer_count, json = payload)
            payload = {'max_viewer_count': maxViewers}
            requests.post(api_url_dashboard_max_viewer_count, json = payload)        

# Lorsqu'un utilisateur follow le live
@client.on("follow")
async def on_follow(event: FollowEvent):
    global connected
    if (connected == True):
        now = datetime.datetime.now().strftime("%H:%M:%S")
        global nbFollow
        nbFollow += 1
        print(f"{now} : \033[32m{event.user.uniqueId}\033[0m a follow l'hôte.")
        payload = {'follower_count': nbFollow}
        requests.post(api_url_dashboard_follower_count, json = payload)

# Lorsqu'un utilisateur like le live
@client.on("like")
async def on_like(event: LikeEvent):
    global connected
    if (connected == True):
        now = datetime.datetime.now().strftime("%H:%M:%S")
        global nbLike
        global lastLikedUser
        nbLike += 1
        payload = {'like_count': nbLike}
        requests.post(api_url_dashboard_like_count, json = payload)
        if {event.user.uniqueId} != lastLikedUser:
            lastLikedUser = {event.user.uniqueId}
            print(f"{now} : \033[32m{event.user.uniqueId}\033[0m a liké le live.")

# Lorsqu'un utilisateur partage le live
@client.on("share")
async def on_share(event: ShareEvent):
    global connected
    if (connected == True):
        now = datetime.datetime.now().strftime("%H:%M:%S")
        global nbShare
        nbShare += 1
        print(f"{now} : \033[32m{event.user.uniqueId}\033[0m a partagé le live.")
        payload = {'share_count': nbShare}
        requests.post(api_url_dashboard_share_count, json = payload)

# Lorsqu'un utilisateur rejoint le live
@client.on("join")
async def on_join(event: JoinEvent):
    global connected
    if (connected == True):
        now = datetime.datetime.now().strftime("%H:%M")
        global lastJoinHour
        global nbJoin
        nbJoin += 1
        if(now != lastJoinHour):
            lastJoinHour = now
            payload = {'join_count': nbJoin}
            requests.post(api_url_dashboard_join_count, json = payload)
        # print(f"{now.hour}:{now.minute}:\033[32m{event.user.uniqueId}\033[0m a rejoint le live.")

# Lorsqu'un utilisateur envoie un message sur le live
@client.on("comment")
async def on_connect(event: CommentEvent):
    global connected
    if (connected == True):
        now = datetime.datetime.now().strftime("%H:%M:%S")
        global nbComment
        global lastCommentHour
        nbComment += 1
        userProfilePicture = event.user.profilePicture.urls[-1]
        userNickname = event.user.nickname
        userComment = event.comment
        print(f"{now} : \033[32m{userNickname}\033[0m a dit : {userComment}")
        if(now != lastCommentHour):
            lastCommentHour = now
            payload1 = {'comment_count': nbJoin}
            requests.post(api_url_dashboard_comment_count, json = payload1)
        payload2 = {'user_profile_picture': userProfilePicture, 'user_nickname': userNickname, 'user_comment': userComment}
        requests.post(api_url_dashboard_comment, json = payload2)

# Lorsqu'un utilisateur s'abonne au live
@client.on("subscribe")
async def on_connect(event: SubscribeEvent):
    global connected
    if (connected == True):
        now = datetime.datetime.now().strftime("%H:%M:%S")
        global nbSub
        nbSub += 1
        userNickname = event.user.nickname
        print(f"{now} : \033[32m{userNickname}\033[0m s'est abonné au live.")
        payload = {'sub_count': nbSub}
        requests.post(api_url_dashboard_sub_count, json = payload)

# Lorsqu'un utilisateur envoie un cadeau
@client.on("gift")
async def on_gift(event: GiftEvent):
    global connected
    if (connected == True):
        now = datetime.datetime.now().strftime("%H:%M:%S")
        global boyCounter
        global girlCounter
        global nbGift
        global gifts
        global nbCoin
        giftValue = next(z["coin_value"] for z in gifts if z["name"] == {event.gift.extended_gift.name}.pop())
        userProfilePicture = event.user.profilePicture.urls[-1]
        userNickname = event.user.nickname

        # Gift streakable, on attend donc que la streak soit finie 
        if event.gift.gift_type == 1:
            if event.gift.repeat_end == 1:
                nbGift += {event.gift.repeat_count}.pop()
                nbCoin += {event.gift.repeat_count}.pop() * giftValue
                # print(
                #     f"{now} : \033[32m{event.user.uniqueId}\033[0m \033[31ma envoyé {event.gift.repeat_count} \"{event.gift.extended_gift.name}\" !\033[0m")
                # if ({event.gift.extended_gift.name}.pop() in ["Weights", "Rose"]):
                #     payload = {'type': {event.gift.extended_gift.name}.pop(), 'number': {event.gift.repeat_count}.pop()}
                #     requests.post(api_url_stream, json = payload)
                #     girlCounter += {event.gift.repeat_count}.pop() 
                #     print(girlCounter)
                payload = {'gift_count': nbGift}
                requests.post(api_url_dashboard_gift_count, json = payload)
                payload = {'coin_count': nbCoin}
                requests.post(api_url_dashboard_coin_count, json = payload)
                payload = {'user_profile_picture': userProfilePicture, 'user_nickname': userNickname,'user_nb_gifted': {event.gift.repeat_count}.pop(), 'user_type_gifted': {event.gift.extended_gift.name}.pop(), 'gifted_value': giftValue, 'total_gifted_value': {event.gift.repeat_count}.pop() * giftValue}
                requests.post(api_url_dashboard_gift, json = payload)

        # Gift non streakable, on fait donc la suite directement
        else:
            print(f"{now} : \033[32m{event.user.uniqueId}\033[0m \033[31ma envoyé \"{event.gift.extended_gift.name}\" !\033[0m")
            nbGift += 1
            nbCoin += giftValue
            # if ({event.gift.extended_gift.name}.pop() in ["Weights", "Rose"]):
            #     payload = {'type': {event.gift.extended_gift.name}.pop(), 'number': 1}
            #     requests.post(api_url_stream, json = payload)
            #     girlCounter += 1
            #     print(girlCounter)
            payload = {'gift_count': nbGift}
            requests.post(api_url_dashboard_gift_count, json = payload)
            payload = {'coin_count': nbCoin}
            requests.post(api_url_dashboard_coin_count, json = payload)
            payload = {'user_profile_picture': userProfilePicture, 'user_nickname': userNickname,'user_nb_gifted': {event.gift.repeat_count}.pop(), 'user_type_gifted': {event.gift.extended_gift.name}.pop(), 'gifted_value': giftValue, 'total_gifted_value': {event.gift.repeat_count}.pop() * giftValue}
            requests.post(api_url_dashboard_gift, json = payload)

# Lorsque le live se termine
@client.on("live_end")
async def on_connect(event: LiveEndEvent):
    global connected
    print("Live terminé.")
    stats()
    connected = False
    payload = {'connected_state': connected}
    requests.post(api_url_dashboard_viewer_count, json = payload)
    
def stats():
    now = datetime.datetime.now()
    global dateFinLive
    global dateDebutLive
    global heureDebutLive
    dateFinLive = now
    heureFinLive = now.strftime("%H:%M:%S")
    dureeLive = dateFinLive - dateDebutLive
    print("------------------------Statistiques---------------------------------")
    print("Statistiques du live depuis que vous avez rejoint : ")
    print(f"Le live a commencé à {heureDebutLive}")
    print(f"Le live s'est fini à {heureFinLive}")
    print(f"Durée du live : {dureeLive}")
    print(f"Max de viewers en simultané : {maxViewers}")
    print(f"Gifts : {nbGift}")
    print(f"Coins : {nbCoin}")
    print(f"Revenus estimés : {round(nbCoin*ratioRevenu,2)}€")
    print(f"Likes : {nbLike}")
    print(f"Abonnements au live : {nbSub}")
    print(f"Nouveaux abonnés : {nbFollow}")
    print(f"Partages : {nbShare}")
    print(f"Personnes ayant rejoint : {nbJoin}")
    print(f"Commentaires : {nbComment}")
    print("---------------------------------------------------------------------")

# @client.on("error")
# async def on_connect(error: Exception):
#     # Handle the error
#     if isinstance(error, LiveNotFound):
#         print("Désolé, cet utilisateur n'est pas en live actuellement.")
#         return

#     # Otherwise, log the error
#     client._log_error(error)

# Fonction main
if __name__ == '__main__':
    # Run the client and block the main thread
    # await client.start() to run non-blocking
    client.run()

    
    