import Link from 'next/link';

export default function Copyright() {
  return (
    <p className={`text-center`}>
      {'Copyright © '}
      <Link color={`inherit`} href="/">The Third Transformation, LLC</Link>{' '}
      {new Date().getFullYear()}.
    </p>
  );
}