import React, { useState } from 'react';

function Mail({posts}) {



  return (
   <>
	     {posts.map((item) => (
		<div className="py-6">

		<header className="flex items-start">
  
		  <img className="rounded-full shrink-0 mr-3" style={{objectFit:"cover",borderRadius:"50%", height: "40px"}} src="http://source.unsplash.com/300x300?girls" width="40" height="40"  />
	 
		  <div className="grow">
			<div className="sm:flex items-start justify-between mb-0.5">
		  
			  <div className="xl:flex items-center mb-2 sm:mb-0">
				<button className="text-sm font-semibold text-slate-800 text-left truncate" >tejas pawar</button>
			
				
					<div className="text-sm text-slate-400 hidden xl:block mx-1">·</div>
					<div className="text-xs">tejaspawar183</div>
			  
			  
			  </div>
			 
			  <div className="text-xs font-medium text-slate-500 whitespace-nowrap mb-2 sm:mb-0">{new Date().toLocaleDateString()}</div>
			</div>
		
		
		 
		
			  <div className="text-sm">{item.data.input}</div>
		 
		  </div>
		</header>
	  
	  
	  </div>
	))}
   </>
  );
}

export default Mail;
