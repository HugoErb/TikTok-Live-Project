# https://github.com/isaackogan/TikTokLive
from TikTokLive import TikTokLiveClient
from TikTokLive.types.events import CommentEvent, ConnectEvent, FollowEvent, ShareEvent, ViewerCountUpdateEvent, SubscribeEvent, LiveEndEvent, LikeEvent, JoinEvent, GiftEvent, DisconnectEvent
from TikTokLive.types.errors import FailedConnection, LiveNotFound
from TikTokLive.types import User
import datetime
import requests

base_url = 'http://localhost:8080/'
api_url_stream = base_url + 'stream'
api_url_dashboard_viewer_count = base_url + 'viewer_count'
api_url_dashboard_max_viewer_count = base_url + 'max_viewer_count'
api_url_dashboard_like_count = base_url + 'like_count'
api_url_dashboard_follower_count = base_url + 'follower_count'
api_url_dashboard_sub_count = base_url + 'sub_count'
api_url_dashboard_share_count = base_url + 'share_count'
api_url_dashboard_comment_count = base_url + 'comment_count'
api_url_dashboard_comment = base_url + 'comment'
api_url_dashboard_gift_count = base_url + 'gift_count'
api_url_dashboard_gift = base_url + 'gift'
api_url_dashboard_coin_count = base_url + 'coin_count'
api_url_dashboard_join_count = base_url + 'join_count'
api_url_dashboard_connected_state = base_url + 'connected_state'
api_url_dashboard_live_start_hour = base_url + 'live_start_hour'
api_url_dashboard_live_name = base_url + 'live_name'
api_url_dashboard_top_gifters = base_url + 'top_gifters'

# Nom du live auquel vous souhaitez vous connectez
liveName = "tiibox"
# Streamers de tests : topparty1 | cedriccommelabd | tiibox | tiibox_spam | d.fdetalles_pirograbados

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
gifts = []
top_gifters = []
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
    global liveName
    dateDebutLive = now
    heureDebutLive = dateDebutLive.strftime("%Hh%M")
    for gift in client.available_gifts.values():
        gifts.append({"name" : gift.name, "coin_value" : gift.diamond_count, "image_url": gift.icon.url_list[0]})
    print(f"{heureDebutLive} : Connecté au live.")
    connected = True
    send_payload({'live_start_hour': heureDebutLive}, api_url_dashboard_live_start_hour)
    send_payload({'connected_state': connected}, api_url_dashboard_connected_state)
    send_payload({'live_name': liveName}, api_url_dashboard_live_name)

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
            send_payload({'viewer_count': event.viewerCount}, api_url_dashboard_viewer_count)  
            send_payload({'max_viewer_count': maxViewers}, api_url_dashboard_max_viewer_count)      

# Lorsqu'un utilisateur follow le live
@client.on("follow")
async def on_follow(event: FollowEvent):
    global connected
    if (connected == True):
        now = datetime.datetime.now().strftime("%H:%M:%S")
        global nbFollow
        nbFollow += 1
        print(f"{now} : \033[32m{event.user.uniqueId}\033[0m a follow l'hôte.")
        send_payload({'follower_count': nbFollow}, api_url_dashboard_follower_count)

# Lorsqu'un utilisateur like le live
@client.on("like")
async def on_like(event: LikeEvent):
    global connected
    if (connected == True):
        now = datetime.datetime.now().strftime("%H:%M:%S")
        global nbLike
        global lastLikedUser
        nbLike += 1
        if {event.user.uniqueId} != lastLikedUser:
            lastLikedUser = {event.user.uniqueId}
            print(f"{now} : \033[32m{event.user.uniqueId}\033[0m a liké le live.")
        send_payload({'like_count': nbLike}, api_url_dashboard_like_count)

# Lorsqu'un utilisateur partage le live
@client.on("share")
async def on_share(event: ShareEvent):
    global connected
    if (connected == True):
        now = datetime.datetime.now().strftime("%H:%M:%S")
        global nbShare
        nbShare += 1
        print(f"{now} : \033[32m{event.user.uniqueId}\033[0m a partagé le live.")
        send_payload({'share_count': nbShare}, api_url_dashboard_share_count)
        

# Lorsqu'un utilisateur rejoint le live
@client.on("join")
async def on_join(event: JoinEvent):
    global connected
    if (connected == True):
        now = datetime.datetime.now().strftime("%H:%M")
        global nbJoin
        nbJoin += 1
        send_payload({'join_count': nbJoin}, api_url_dashboard_join_count)
        # print(f"{now.hour}:{now.minute}:\033[32m{event.user.uniqueId}\033[0m a rejoint le live.")

# Lorsqu'un utilisateur envoie un message sur le live
@client.on("comment")
async def on_connect(event: CommentEvent):
    global connected
    if (connected == True):
        now = datetime.datetime.now().strftime("%H:%M:%S")
        global nbComment
        nbComment += 1
        userProfilePicture = event.user.profilePicture.urls[-1]
        userNickname = event.user.nickname
        userComment = event.comment
        print(f"{now} : \033[32m{userNickname}\033[0m a dit : {userComment}")
        send_payload({'comment_count': nbComment}, api_url_dashboard_comment_count)
        send_payload({'user_profile_picture': userProfilePicture, 'user_nickname': userNickname, 'user_comment': userComment}, api_url_dashboard_comment)

# Lorsqu'un utilisateur s'abonne au live
@client.on("subscribe")
async def on_connect(event: SubscribeEvent):
    global connected
    if (connected == True):
        now = datetime.datetime.now().strftime("%H:%M:%S")
        global nbSub
        nbSub += 1
        userNickname = event.user.uniqueId
        print(f"{now} : \033[32m{userNickname}\033[0m s'est abonné au live.")
        send_payload({'sub_count': nbSub}, api_url_dashboard_sub_count)

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
        userID = event.user.uniqueId

        # Gift streakable, on attend donc que la streak soit finie
        if event.gift.gift_type == 1:
            if event.gift.repeat_end == 1:
                nbGift += {event.gift.repeat_count}.pop()
                nbCoin += {event.gift.repeat_count}.pop() * giftValue
                print(f"{now} : \033[32m{event.user.uniqueId}\033[0m \033[31ma envoyé {event.gift.repeat_count} \"{event.gift.extended_gift.name}\" !\033[0m")
                # if ({event.gift.extended_gift.name}.pop() in ["Weights", "Rose"]):
                #     payload = {'type': {event.gift.extended_gift.name}.pop(), 'number': {event.gift.repeat_count}.pop()}
                #     requests.post(api_url_stream, json = payload)
                #     girlCounter += {event.gift.repeat_count}.pop() 
                #     print(girlCounter)
                send_payload({'gift_count': nbGift}, api_url_dashboard_gift_count)
                send_payload({'coin_count': nbCoin}, api_url_dashboard_coin_count)
                send_payload({'user_profile_picture': userProfilePicture, 'user_nickname': userNickname,'user_nb_gifted': {event.gift.repeat_count}.pop(), 'user_type_gifted': {event.gift.extended_gift.name}.pop(), 'gifted_value': giftValue, 'total_gifted_value': {event.gift.repeat_count}.pop() * giftValue}, api_url_dashboard_gift)
                set_top_gifters({'user_ID': userID ,'user_profile_picture': userProfilePicture, 'user_nickname': userNickname,'user_total_coins_gifted': {event.gift.repeat_count}.pop() * giftValue})

        # Gift non streakable, on fait donc la suite directement
        else:
            nbGift += 1
            nbCoin += giftValue
            print(f"{now} : \033[32m{event.user.uniqueId}\033[0m \033[31ma envoyé \"{event.gift.extended_gift.name}\" !\033[0m")
            # if ({event.gift.extended_gift.name}.pop() in ["Weights", "Rose"]):
            #     payload = {'type': {event.gift.extended_gift.name}.pop(), 'number': 1}
            #     requests.post(api_url_stream, json = payload)
            #     girlCounter += 1
            #     print(girlCounter)
            send_payload({'gift_count': nbGift}, api_url_dashboard_gift_count)
            send_payload({'coin_count': nbCoin}, api_url_dashboard_coin_count)
            send_payload({'user_profile_picture': userProfilePicture, 'user_nickname': userNickname,'user_nb_gifted': {event.gift.repeat_count}.pop(), 'user_type_gifted': {event.gift.extended_gift.name}.pop(), 'gifted_value': giftValue, 'total_gifted_value': {event.gift.repeat_count}.pop() * giftValue}, api_url_dashboard_gift)
            set_top_gifters({'user_ID': userID, 'user_profile_picture': userProfilePicture, 'user_nickname': userNickname,'user_total_coins_gifted': giftValue})

# Lorsque le live se termine
@client.on("live_end")
async def on_connect(event: LiveEndEvent):
    global connected
    print("Live terminé.")
    stats()
    connected = False
    payload = {'connected_state': connected}
    requests.post(api_url_dashboard_connected_state, json = payload)

@client.on("disconnect")
async def on_disconnect(event: DisconnectEvent):
    global connected
    print("Déconnecté du live.")
    stats()
    connected = False
    payload = {'connected_state': connected}
    requests.post(api_url_dashboard_connected_state, json = payload)
    
def stats():
    """
    Affiche les statistiques du live
    """
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

def send_payload(payload, url):
    """
    Envoie le payload reçu en paramètre, sur l'url reçue en paramètre.
    Envoie également l'état de la connexion, le nom du live et l'heure de connexion du live au dashboard afin de le garder à jour.

    Args:
        payload (dict): payload à envoyer
        url (string): url sur laquelle doit être envoyée le payload (dashboard ou live)
    """
    global connected
    global heureDebutLive
    global liveName
    requests.post(url, json = payload)
    payload_connected_state = {'connected_state': connected}
    requests.post(api_url_dashboard_connected_state, json = payload_connected_state)
    payload_live_name = {'live_name': liveName}
    requests.post(api_url_dashboard_live_name, json = payload_live_name)
    payload_live_start_hour = {'live_start_hour': heureDebutLive}
    requests.post(api_url_dashboard_live_start_hour, json = payload_live_start_hour)

def set_top_gifters(potential_new_top_gifter):
    """
    Cherche si le donateur actuel est déjà connu de la liste des top donateurs.
    Si oui, on augmente son nombre de coins envoyées.
    Sinon, on l'ajoute à la liste des donateurs si il en fait partie.

    Args:
        potential_new_top_gifter (dict): données du donateur actuel
    """
    global top_gifters
    user = next((item for item in top_gifters if item['user_ID'] == potential_new_top_gifter['user_ID']), None)
    # Si on a pas encore complètement rempli le tableau
    if(len(top_gifters) < 3):
        # Si l'utilisateur n'est pas un top contributeur
        if not user:
            top_gifters.insert(0,potential_new_top_gifter)
        # Si l'utilisateur est déjà un top contributeur
        else:
            user_index = top_gifters.index(user)
            user['user_total_coins_gifted'] += potential_new_top_gifter['user_total_coins_gifted']
            top_gifters[user_index] = user
    # Si on a déjà 3 top contributeurs
    else:
        # Si l'utilisateur n'est pas un top contributeur
        if not user:
                if(potential_new_top_gifter['user_total_coins_gifted'] > top_gifters[0]['user_total_coins_gifted']):
                    del top_gifters[0]
                    top_gifters.insert(0,potential_new_top_gifter)
        # Si l'utilisateur est déjà un top contributeur
        else:
            user_index = top_gifters.index(user)
            user['user_total_coins_gifted'] += potential_new_top_gifter['user_total_coins_gifted']
            top_gifters[user_index] = user
    top_gifters = sorted(top_gifters, key=lambda x: x['user_total_coins_gifted'])
    send_payload(top_gifters, api_url_dashboard_top_gifters)

# Fonction main
if __name__ == '__main__':
    """
    Fonction main : lance le client et bloque le thread principal
    """
    client.run()