import { Indicator, Notification, rem } from "@mantine/core"
import { Menu } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { IoIosNotifications } from "react-icons/io"
import { useSelector } from "react-redux"
import { getNotifications, readNotification } from "../../Services/NotiService"
import { useNavigate } from "react-router-dom"
export const NotiMenu = () => {
    const navigate = useNavigate()
    const [opened, setOpened] = useState(false)
    const user = useSelector((state: any) => state.user)
    const [notifications, setNotifications] = useState([])
    useEffect(() => {
        getNotifications(user.id).then((res) => {
            setNotifications(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [user])
    const unread = (index: any) => {
        let notis = [...notifications]
        notis = notis.filter((i: number) => i !== index)
        setNotifications(notis)
        const notificationId = notifications[index]?.id; // Safely access the id
        if (notificationId) {
            readNotification(notificationId).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            });
        }
    }
    return (
        <div>
            <Menu opened={opened} onChange={setOpened} shadow="md" width={400}>
                <Menu.Target>
                    <div className="p-2 rounded-full bg-[var(--color-mine-shaft-900)]">
                        <Indicator disabled={notifications.length <= 0} color="#8a2be2" offset={6} size={8} processing>
                            <IoIosNotifications className="text-2xl" />
                        </Indicator>
                    </div>
                </Menu.Target>

                <Menu.Dropdown onChange={() => setOpened(true)}>
                    <div className="flex flex-col gap-2">
                        {
                            notifications.map((noti: any, index: number) => (
                                <Notification key={index}
                                    onClick={() => {
                                        navigate(noti.route)
                                        setOpened(false)
                                        unread(index)
                                    }}
                                    onClose={() => unread(index)} className="hover:bg-[var(--color-mine-shaft-900)] cursor-pointer" icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />} color="teal" title={noti.action} mt="md">
                                    {noti.message}
                                </Notification>
                            ))
                        }
                        {
                            notifications.length === 0 && (
                                <div className="text-center text-gray-500">No notifications</div>
                            )
                        }
                    </div>
                </Menu.Dropdown>
            </Menu>
        </div >
    )
}
