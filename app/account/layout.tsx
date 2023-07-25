import styles from './account.module.css'

export const metadata = {
  title: 'Account',
  description: 'Employment for the 21st Century',
}
interface LayoutProps {
  children: React.ReactNode
}

export default function AccountLayout({ children }:LayoutProps) {
  return (
    <section className={`bg-fixed min-h-screen`} >
      <div className={`container`}>
        {children}
      </div>
    </section>
  );
}