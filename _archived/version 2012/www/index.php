<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8"/>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="description" content="Lou Huang is a LEED-accredited urban designer and architect based in San Francisco, specializing in graphic presentation, environmental sustainability and transit-oriented planning for progressive, human-centric communities." /> 
		<meta name="keywords" content="architect, urban, city, planner, designer, web, photographer, photography, photo, print, developer, San Francisco, Bay Area, California, USA" />

		<title>Lou Huang</title>

		<!--[if lt IE 9]>
			<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<link rel="stylesheet" href="styles.css" type="text/css" media="all" />
		<meta name="viewport" content="width=device-width, initial-scale=1"/>
		<!-- Adding "maximum-scale=1" fixes the Mobile Safari auto-zoom bug: http://filamentgroup.com/examples/iosScaleBug/ -->
		
		<link href="js/jquery.jscrollpane.css" rel="stylesheet" media="all" type="text/css" />
		<style type="text/css">
			body {
				background: #222 url('images/<?php

	# see if there is a specified bg (for testing y'know)
	$bg = $_GET['bg'];
	if ($bg) {
		echo $bg;
	}
	else {
		# here we are going to come up with a random bg image
		$a = array("bg01", "bg02", "bg03", "bg04", "bg05", "bg06", "bg07", "bg08");
		$b = array_rand($a, 1);
		echo $a[$b];
	}	

	?>.jpg') center center fixed no-repeat;
			}
		</style>
		<link rel="icon" type="image/png" href="favicon.png" />
	
		<link href='http://fonts.googleapis.com/css?family=Asap:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
		<script src="js/cufon-yui.js" type="text/javascript"></script>
		<script src="js/jquery-1.6.1.min.js" type="text/javascript"></script>
		<script src="js/jquery.mousewheel.js" type="text/javascript"></script>
		<script src="js/jquery.jscrollpane.min.js" type="text/javascript"></script>
		<script src="js/jquery.ba-hashchange.min.js" type="text/javascript"></script>
		<script src="fonts/Avenir_600-Avenir_750.font.js" type="text/javascript"></script>
		<script src="fonts/Tungsten_350-Tungsten_375.font.js" type="text/javascript"></script>
		<script src="js/konami.js" type="text/javascript"></script>
		<script src="site.js" type="text/javascript"></script>
		<script type="text/javascript">
		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-84293-2']);
		  _gaq.push(['_trackPageview']);

		  (function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();

		</script>
	</head>
	
	<body lang="en">
		
		<div id="col1">
			<div class="translucentBox">&nbsp;</div>

			<div id="title">
				<h1><img src="images/title.png" height="150" alt=""><span>Lou Huang</span></h1>
			</div>
						
			<div id="about">
				<div class="text">
					<p>Hi! I'm Lou Huang, a LEED-accredited urban designer based in San Francisco. I specialize in <strong>graphic presentation</strong>, <strong>environmental sustainability</strong> and <strong>transit-oriented planning</strong> for progressive, <strong>human-centric communities</strong>.</p>
				</div>
			</div>
			
			<div id="navbox">
				<ul id="nav">
					<li id="n-portfolio"><span>Portfolio</span></li>
					<li id="n-resume"><span>Resume</span></li>
					<li id="n-projects"><span>Current Projects</span></li>
					<li id="n-contact"><span>Contact</span></li>
				</ul>
			</div>
			
			<!--
			<div id="DEBUG" style="height: 200px; position: relative; margin: 12px; overflow: auto;">
				<div class="text">
					<div id="debugtext" style="overflow: auto;">DEBUG!</div>
				</div>
			</div>
			// -->
			
		</div>
		
		<div id="col2">
			<div class="translucentBox">&nbsp;</div>
			
			<div id="d-portfolio" style="display:none;">
			<div id="port-content">
				
				<h2>Portfolio</h2>
			
				<div id="port-menu">
					
					<div class="menu-section">			
						<h3>Urban Design & Planning</h3>
			
						<div class="menu-leftarrow"><img src="images/menu_left.png" alt=""></div>
						<div class="menu-rightarrow"><img src="images/menu_right.png" alt=""></div>
						<div id="menu-cpln" class="menu-row">
							<div class="scroller">
								<a href="portfolio/portfolio.html#saccatalyst"><div class="menu-item">
									<img src="portfolio/thumb_saccatalyst.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">River City Promenade<br /><span class="subtitle">Sacramento, CA</span></div>
								</div></a>
								<a href="portfolio/portfolio.html#centralflorida"><div class="menu-item">
									<img src="portfolio/thumb_centralflorida.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">Connecting for Global Competitiveness<br /><span class="subtitle">Central Florida</span></div>
								</div></a>
								<a href="portfolio/portfolio.html#lamodafresca"><div class="menu-item">
									<img src="portfolio/thumb_lamodafresca.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">La Moda Fresca<br /><span class="subtitle">San Diego, CA</span></div>
								</div></a>
								<a href="portfolio/portfolio.html#schuylkill"><div class="menu-item">
									<img src="portfolio/thumb_lowerschuylkill.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">The Lower Schuylkill: Smart by Design<br /><span class="subtitle">Philadelphia, PA</span></div>
								</div></a>
								<a href="portfolio/portfolio.html#northarlington"><div class="menu-item">
									<img src="portfolio/thumb_northarlington.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">North Arlington Infill Development<br /><span class="subtitle">North Arlington, NJ</span></div>
								</div></a>
								<a href="portfolio/portfolio.html#caciquegardens"><div class="menu-item">
									<img src="portfolio/thumb_caciquegardens.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">Cacique Gardens<br /><span class="subtitle">Kingston, Jamaica</span></div>
								</div></a>
								<a href="portfolio/portfolio.html#eastorange"><div class="menu-item">
									<img src="portfolio/thumb_eastorange.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">East Orange Gateways<br /><span class="subtitle">East Orange, NJ</span></div>
								</div></a>
								<a href="portfolio/portfolio.html#portrichmond"><div class="menu-item">
									<img src="portfolio/thumb_portrichmond.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">Vision for Port Richmond<br /><span class="subtitle">Philadelphia, PA</span></div>
								</div></a>
							</div>
						</div>
					</div>
					
					<div class="menu-section">			
						<h3>Architecture</h3>
			
						<div class="menu-leftarrow"><img src="images/menu_left.png" alt=""></div>
						<div class="menu-rightarrow"><img src="images/menu_right.png" alt=""></div>
						<div id="menu-arch" class="menu-row">
							<div class="scroller">
								<a href="portfolio/portfolio.html#peets"><div class="menu-item">
									<img src="portfolio/thumb_peets.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">Peet's Coffee & Tea<br /><span class="subtitle">Various Locations</span></div>
								</div></a>							
								<a href="portfolio/portfolio.html#tandoorioven"><div class="menu-item">
									<img src="portfolio/thumb_tandoorioven.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">Tandoori Oven<br /><span class="subtitle">Redwood City, CA</span></div>
								</div></a>							
								<a href="portfolio/portfolio.html#dealhouse"><div class="menu-item">
									<img src="portfolio/thumb_dealhouse.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">Deal House<br /><span class="subtitle">Fairfax, CA</span></div>
								</div></a>							
								<a href="portfolio/portfolio.html#epstein"><div class="menu-item">
									<img src="portfolio/thumb_epstein.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">Epstein House<br /><span class="subtitle">Fairfax, CA</span></div>
								</div></a>							
								<a href="portfolio/portfolio.html#resto"><div class="menu-item">
									<img src="portfolio/thumb_resto.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">Restoration Hardware<br /><span class="subtitle">Calgary, Alberta</span></div>
								</div></a>							
								<a href="portfolio/portfolio.html#vonscheven"><div class="menu-item">
									<img src="portfolio/thumb_vonscheven.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">Von Scheven House<br /><span class="subtitle">Fairfax, CA</span></div>
								</div></a>							
							</div>
						</div>
					</div>
					
					<div class="menu-section">			
						<h3>Web & Print</h3>
			
						<div class="menu-leftarrow"><img src="images/menu_left.png" alt=""></div>
						<div class="menu-rightarrow"><img src="images/menu_right.png" alt=""></div>
						<div id="menu-misc" class="menu-row">
							<div class="scroller">					
								<a href="portfolio/portfolio.html#calitransit"><div class="menu-item">
									<img src="portfolio/thumb_calitransit.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">California Transit Diagram</div>
								</div></a>							
								<a href="portfolio/portfolio.html#panorama"><div class="menu-item">
									<img src="portfolio/thumb_panorama.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">Panorama</div>
								</div></a>							
								<a href="portfolio/portfolio.html#nomelette"><div class="menu-item">
									<img src="portfolio/thumb_nomelette.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">Nomelette</div>
								</div></a>							
								<a href="portfolio/portfolio.html#crome"><div class="menu-item">
									<img src="portfolio/thumb_crome.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">Crome Architecture Marketing</div>
								</div></a>							
								<a href="portfolio/portfolio.html#photo"><div class="menu-item">
									<img src="portfolio/thumb_lhphoto.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">Photography</div>
								</div></a>							
								<a href="portfolio/portfolio.html#bluegold"><div class="menu-item">
									<img src="portfolio/thumb_bluegold.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">Blue & Gold Yearbook</div>
								</div></a>							
								<a href="portfolio/portfolio.html#chocolatemango"><div class="menu-item">
									<img src="portfolio/thumb_chocolatemango.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">Better Together: Andrew and Kelly</div>
								</div></a>							
								<a href="portfolio/portfolio.html#sfbaymosaic"><div class="menu-item">
									<img src="portfolio/thumb_sfbaymosaic.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">SF Bay Mosaic</div>
								</div></a>							
								<a href="portfolio/portfolio.html#tab"><div class="menu-item">
									<img src="portfolio/thumb_tab.jpg" width=280 height=180 alt="">
									<div class="caption menu-title">The Address Book</div>
								</div></a>							
							</div>
						</div>
					</div>
			
				</div>
			
				<div id="port-loader"></div>
			
				<div id="port-project" style="display:none;">
					
					<div id="port-backbutton" title="return to main menu [up arrow]"></div>
					<div id="port-dropbutton">More projects</div>
					<div id="port-dropdown">
						<ul>
							<li>Urban Design & Planning</li>
							<li>
								<ul>
									<li><a href="portfolio/portfolio.html#saccatalyst">River City Promenade</a></li>
									<li><a href="portfolio/portfolio.html#centralflorida">Central Florida</a></li>
									<li><a href="portfolio/portfolio.html#lamodafresca">La Moda Fresca</a></li>
									<li><a href="portfolio/portfolio.html#schuylkill">The Lower Schuylkill: Smart by Design</a></li>
									<li><a href="portfolio/portfolio.html#northarlington">North Arlington Infill Development</a></li>
									<li><a href="portfolio/portfolio.html#caciquegardens">Cacique Gardens</a></li>
									<li><a href="portfolio/portfolio.html#eastorange">East Orange Gateways</a></li>
									<li><a href="portfolio/portfolio.html#portrichmond">Vision for Port Richmond</a></li>
								</ul>
							</li>
							<li>Architecture</li>
							<li>
								<ul>
									<li><a href="portfolio/portfolio.html#peets">Peet's Coffee & Tea</a></li>
									<li><a href="portfolio/portfolio.html#tandoorioven">Tandoori Oven</a></li>
									<li><a href="portfolio/portfolio.html#dealhouse">Deal House</a></li>
									<li><a href="portfolio/portfolio.html#epstein">Epstein House</a></li>
									<li><a href="portfolio/portfolio.html#resto">Restoration Hardware</a></li>
									<li><a href="portfolio/portfolio.html#vonscheven">Von Scheven House</a></li>
								</ul>
							</li>
							<li>Web & Print</li>
							<li>
								<ul>
									<li><a href="portfolio/portfolio.html#calitransit">California Transit Diagram</a></li>
									<li><a href="portfolio/portfolio.html#panorama">Panorama</a></li>
									<li><a href="portfolio/portfolio.html#nomelette">Nomelette</a></li>
									<li><a href="portfolio/portfolio.html#crome">Crome Architecture Marketing</a></li>
									<li><a href="portfolio/portfolio.html#photo">Photography</a></li>
									<li><a href="portfolio/portfolio.html#bluegold">Blue & Gold Yearbook</a></li>
									<li><a href="portfolio/portfolio.html#chocolatemango">Better Together: Andrew and Kelly</a></li>
									<li><a href="portfolio/portfolio.html#sfbaymosaic">SFBay Mosaic</a></li>
									<li><a href="portfolio/portfolio.html#tab">The Address Book</a></li>
								</ul>
							</li>
							<li id="port-dropback"><a href="#portfolio">&laquo; Return to main menu</a></li>
						</ul>
					</div>
					
					<div id="port-projectdata">
						<!-- PLACEHOLDER -->
					</div>
				</div>
			
			
			</div>
			</div>
			
			
			<div id="d-resume" style="display:none;">
				<h2>Resume</h2>
				
				<div class="resume-left">
					<h3>Education</h3>
					
					<div class="text">
						<p><strong><a href="http://www.design.upenn.edu/" target="_blank">University of Pennsylvania School of Design</a></strong> <img src="images/extlink.gif" width=9 height=9 alt="">
						<br />Master of City Planning, Class of 2010
						<br />Concentration in Urban Design</p>
						
						<p><strong><a href="http://arch.ced.berkeley.edu/" target="_blank">University of California, Berkeley</a></strong> <img src="images/extlink.gif" width=9 height=9 alt="">
						<br />Bachelor of Arts in Architecture, Class of 2004
						<br />Minor in Social and Cultural Factors in Environmental Design</p>
					</div>
						
					<h3>Experience</h3>
					
					<div class="text">
						<p><strong><a href="http://www.vmwp.com/" target="_blank">Van Meter Williams Pollack</a></strong> <img src="images/extlink.gif" width=9 height=9 alt="">  San Francisco, CA
						<br />Urban Designer (2011-current)</p>
						
						<p><strong><a href="http://www.bkurbandesign.com/" target="_blank">Brown & Keener Urban Design</a></strong> <img src="images/extlink.gif" width=9 height=9 alt="">  Philadelphia, PA
						<br />Intern/Designer (2009-2010)</p>
						
						<p><strong><a href="http://www.issuu.com/pennpanorama/docs/2010_panorama/1" target="_blank">Panorama</a></strong> <img src="images/extlink.gif" width=9 height=9 alt="">  University of Pennsylvania, Philadelphia, PA
						<br />Design Editor (2008-2010)</p>
						
						<p><strong><a href="http://www.cromearchitecture.com/" target="_blank">Crome Architecture</a></strong> <img src="images/extlink.gif" width=9 height=9 alt="">  San Rafael, CA
						<br />Designer, Project Manager (2004-2008)</p>
					</div>
					
					<h3>Awards</h3>
					
					<div class="text">
						<p><strong><a href="http://www.saccatalyst.com/" target="_blank">Sacramento Catalyst Competition</a></strong> <img src="images/extlink.gif" width=9 height=9 alt="">  Sacramento, CA 
						–  2011 Second Place Winner</p>
						
						<p><strong><a href="https://sites.google.com/site/hinesdesign2010/" target="_blank">ULI / Gerald D. Hines Student Urban Design Competition</a></strong> <img src="images/extlink.gif" width=9 height=9 alt="">  San Diego, CA 
						–  2010 Finalist, Team Leader</p>
						
						<p><strong>Department of City and Regional Planning Special Award for Excellence in 
						Student Publications</strong> – 2010</p>
					</div>
				</div>
				
				<div class="resume-right">
					<h5>Skills</h5>

					<div class="text">
					<p>
					<strong>Software</strong>
					<br />ArchiCAD
					<br />VectorWorks
					<br />AutoCAD
					<br />ArcGIS
					<br />SketchUp
					<br />Photoshop
					<br />InDesign
					<br />Illustrator
					<br />Microsoft Office
					<br />Operating system proficiency in Windows XP/
					Vista, Macintosh OS X, and Linux platforms
					</p>
					
					<p>
					<strong>Web Design</strong>
					<br />Standards-compliant HTML, JavaScript, 
					Cascading Style Sheets, PHP, MySQL.  
					</p>
					
					<p>
					<strong>Photography</strong>
					<br />Portraits, weddings, events and architecture
					</p>
					
					<p>
					<strong>Language Proficiency</strong>
					<br />Mandarin Chinese
					</p>
					
					</div>
					
					<h5>Professional Affiliations</h5>
					
					<div class="text">
					<p>
					<strong>LEED</strong>  Accredited Professional<br />
					<strong>APA</strong>  Member<br />
					<strong><a href="http://spur.org/" target="_blank">SPUR</a></strong> <img src="images/extlink.gif" width=9 height=9 alt="">  Member
					</p>
					</div>

				</div>

				<div style="clear: both; padding-top: 10px;" class="text">
					<a href="portfolio/downloads/louhuang_resume.pdf" class="noborder" target="_blank"><img src="images/pdf.png" width=32 height=32 alt="download PDF" title="download PDF"> <span class="note">download resume [pdf]</span></a>
				</div>
				
			</div>

			<div id="d-projects" style="display:none;">
				<h2>Current Projects</h2>

				<div class="current">
					<img src="current/thumb_sfpopos.jpg" width=280 height=180 alt="" />
					<h3>SFPOPOS</h3>
					<p class="text">
					An online guide to San Francisco's Privately Owned Publicly Open Spaces (POPOS).
					<a href="http://sfpopos.com/" target="_blank">View site</a> <img src="images/extlink.gif" width=9 height=9 alt="">
					</p>
				</div>

				<div class="current">
					<img src="current/thumb_sunnydale.jpg" width=280 height=180 alt="" />
					<h3>Sunnydale Hope SF</h3>
					<p class="text">
					A 50-acre master plan development for San Francisco's largest public housing neighborhood. The plan has achieved LEED-ND Stage 1 Gold certification.
					<a href="http://www.vmwp.com/projects/sunnydale-hope-sf-master-plan.php" target="_blank">View site</a> <img src="images/extlink.gif" width=9 height=9 alt="">
					</p>
				</div>

				<div class="current">
					<img src="current/thumb_2175market.jpg" width=280 height=180 alt="" />
					<h3>2175 Market</h3>
					<p class="text">
					A 80+ unit mixed use development in the Upper Market/Lower Octavia area in San Francisco.
					<a href="http://www.2175market.com/" target="_blank">View site</a> <img src="images/extlink.gif" width=9 height=9 alt="">
					</p>
				</div>

				<div class="current">
					<img src="current/thumb_fabboard.jpg" width=280 height=180 alt="" />
					<h3>fabboard</h3>
					<p class="text">
					Fashion pinboard site.
					<a href="http://www.fabboard.com/" target="_blank">View site</a> <img src="images/extlink.gif" width=9 height=9 alt="">
				</p>
				</div>
				
			</div>

			<div id="d-contact" style="display:none;">
				<h2>Contact</h2>
				
				<p class="text">
				E-mail:  <a href="mailto:lou@louhuang.com">lou@louhuang.com</a>
				<br /> Phone:  510.364.0641
				</p>
				
				<h3>Social</h3>
				
				<p>
				<a href="http://www.linkedin.com/in/louhuang" class="noborder" target="_blank"><img src="images/social/linkedin.png" width=32 height=32 alt="LinkedIn"></a>
				<a href="https://twitter.com/#!/saikofish" class="noborder" target="_blank"><img src="images/social/twitter.png" width=32 height=32 alt="Twitter"></a>
				<a href="http://archinect.com/people/cover/25942652/lou-huang" class="noborder" target="_blank"><img src="images/social/archinect.png" width=32 height=32 alt="Archinect"></a>
				</p>
				
			</div>

			
		</div>
			
		
		<script type="text/javascript"> Cufon.now(); </script>

	</body>
	
</html>