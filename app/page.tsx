import Image from 'next/image'
import AddButton from '@/components/add'
import Task from '@/components/task'
//import styles from'./styles.module.css'

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className ="text-center text-2xl mt-5 ">To do list</h1>
      <AddButton />
    </main>

  )
}