interface TestTabProps {
tab_index: number
}

export function TestTab({tab_index}:TestTabProps){
console.log("test ",tab_index," tab mounted")
return (
  <div className="flex h-full min-h-screen w-full items-center justify-center gap-2">
    <h3 className="text-2xl font-bold">Test Tab</h3>
    <h3 className="text-2xl font-bold text-accent">{tab_index}</h3>

  </div>
);
}
