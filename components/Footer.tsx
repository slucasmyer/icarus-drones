import ProTip from "./ProTip";
import Copyright from "./Copyright";
export default function Footer(props: any) {
  return (
    <footer className={`flex-col justify-around bg-indigo-700 text-slate-200 bottom-0`}>
      <ProTip />
      <Copyright />
    </footer>
  )
}