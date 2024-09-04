import React from 'react';
import { Footer } from '../components/Footer';

export function Terms() {
	return (
		<>
			<section className="border-b">
				<div className="flex flex-row items-center justify-center w-full p-2 mx-auto px-2 sm:px-6 lg:max-w-6xl lg:px-28 items-center justify-center md:px-6">
					<div className="h-10 focus:outline-none focus:shadow-outline">
						<span className="text-sm tracking-tighter text-black transition duration-500 ease-in-out transform hover:text-slate-500 text-opacity-80 tracking-relaxed">
							<a href="/" className="inline-flex items-center">
								<svg
									className="w-10 h-10"
									xmlns="http://www.w3.org/2000/svg"
									version="1.1"
									id="Layer_1"
									x="0px"
									y="0px"
									viewBox="0 0 229 229"
									fill="currentColor"
								>
									<g
										transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
										fill="#000000"
										stroke="none"
									>
										<path d="M465 1686 c-85 -32 -126 -111 -110 -214 21 -144 241 -190 327 -68 31 42 37 148 12 201 -35 74 -143 112 -229 81z m125 -52 c49 -20 70 -56 70 -119 0 -66 -21 -100 -74 -120 -79 -30 -153 0 -176 71 -23 69 5 144 63 169 42 19 68 18 117 -1z" />
										<path d="M925 1681 c-72 -33 -105 -86 -105 -167 0 -58 20 -103 59 -137 110 -92 283 -30 298 106 11 96 -23 163 -102 198 -51 24 -99 24 -150 0z m129 -45 c18 -7 43 -26 55 -42 31 -40 26 -131 -9 -169 -54 -58 -153 -55 -204 6 -35 41 -37 123 -4 164 39 50 102 66 162 41z" />
										<path d="M1397 1686 c-79 -29 -107 -75 -107 -174 0 -55 5 -76 23 -102 69 -104 244 -101 308 4 26 43 26 159 0 202 -41 67 -145 99 -224 70z m102 -42 c18 -4 45 -20 62 -36 26 -26 29 -36 29 -93 0 -57 -3 -66 -30 -93 -54 -54 -155 -51 -200 5 -15 19 -20 41 -20 87 0 70 16 101 64 122 36 15 51 17 95 8z" />
										<path d="M353 1315 c-31 -22 -236 -384 -236 -417 0 -40 29 -68 70 -68 35 0 59 19 111 85 l23 30 -6 -45 c-15 -110 -55 -495 -55 -525 0 -44 31 -70 81 -69 67 2 83 26 119 181 18 74 33 133 35 131 1 -2 8 -50 14 -108 18 -164 20 -170 55 -191 36 -23 88 -20 118 8 18 16 19 28 12 262 -6 228 -2 318 22 514 l6 47 44 0 44 0 0 -152 c0 -98 -9 -243 -26 -401 -25 -235 -26 -248 -9 -267 25 -27 67 -34 109 -16 43 18 46 24 81 199 16 75 31 137 35 137 4 0 19 -62 35 -137 35 -175 38 -181 81 -199 45 -19 89 -10 110 21 14 22 14 45 -10 262 -17 154 -26 295 -26 396 l0 157 44 0 44 0 6 -42 c22 -165 28 -303 21 -523 -6 -230 -6 -241 13 -258 30 -28 82 -31 118 -8 35 21 37 27 55 191 6 58 13 106 14 108 2 2 17 -57 35 -131 36 -155 52 -179 119 -181 50 -1 81 25 81 68 0 29 -42 432 -56 528 -5 43 -5 43 13 21 10 -11 31 -37 46 -57 23 -30 34 -36 66 -36 46 0 71 24 71 68 0 39 -201 395 -236 418 -26 18 -52 15 -127 -11 -41 -15 -53 -16 -90 -4 -67 20 -301 23 -369 4 -47 -13 -63 -13 -100 -3 -60 17 -330 16 -385 -1 -37 -12 -49 -11 -90 4 -72 25 -105 28 -130 10z m81 -49 c58 -24 108 -28 161 -11 82 25 116 20 155 -20 l34 -35 -52 0 c-33 0 -54 -5 -57 -12 -2 -7 -12 -92 -21 -188 -13 -137 -15 -226 -10 -407 6 -216 5 -232 -11 -235 -31 -7 -53 3 -58 26 -2 11 -11 86 -20 166 -9 80 -22 151 -27 158 -13 15 -54 16 -63 1 -4 -5 -24 -83 -45 -172 -41 -175 -58 -204 -99 -178 -13 8 -12 38 8 218 12 114 32 270 43 345 30 207 17 216 -90 63 -69 -99 -99 -124 -116 -97 -5 8 180 348 206 380 13 15 21 15 62 -2z m1200 -8 c49 -76 204 -363 200 -370 -17 -27 -47 -1 -116 97 -108 154 -121 144 -89 -68 11 -78 31 -234 42 -345 19 -174 20 -205 8 -213 -41 -26 -57 3 -102 186 -40 163 -43 170 -68 173 -14 2 -31 -3 -36 -10 -6 -7 -19 -78 -28 -158 -9 -80 -18 -155 -20 -167 -5 -22 -27 -32 -58 -25 -17 4 -17 19 -11 236 5 181 3 269 -10 406 -9 96 -19 181 -21 188 -3 7 -24 12 -57 12 l-52 0 34 35 c39 40 73 45 155 20 53 -17 104 -13 159 11 43 18 53 17 70 -8z m-692 -4 c43 -15 57 -15 96 -4 98 26 197 23 151 -6 -6 -3 -20 -25 -30 -48 -28 -63 -26 -310 6 -601 21 -183 23 -230 13 -236 -12 -8 -46 -3 -57 7 -3 2 -22 86 -43 186 -21 100 -43 188 -49 195 -7 7 -19 13 -29 13 -10 0 -22 -6 -29 -13 -6 -7 -28 -95 -49 -195 -21 -100 -40 -184 -43 -186 -11 -10 -45 -15 -57 -7 -11 6 -9 50 12 235 18 153 26 281 26 392 0 175 -8 214 -52 261 l-21 23 52 0 c29 0 75 -7 103 -16z" />
									</g>
								</svg>
								<span className="select-none text-base font-bold leading-snug tracking-wide">
									Friendore
								</span>
							</a>
						</span>
					</div>
				</div>
			</section>
			<section className="animate-slide-fade relative w-full overflow-hidden">
				<div className="flex flex-col w-full p-5 mx-auto px-2 sm:px-6 lg:max-w-6xl lg:px-28 md:px-6">
					<main className="container mx-auto p-6 bg-white rounded-lg">
						<h1 className="text-2xl font-semibold text-gray-900 mb-4">
							Terms &amp; Conditions
						</h1>
						<p>Updated at 2024-08-23</p>

						<h3 className="mt-6 font-semibold">General Terms</h3>
						<p>
							By accessing and placing an order with friendore, you confirm that
							you are in agreement with and bound by the terms of service
							contained in the Terms &amp; Conditions outlined below. These
							terms apply to the entire website and any email or other type of
							communication between you and friendore.
						</p>
						<p>
							Under no circumstances shall friendore team be liable for any
							direct, indirect, special, incidental or consequential damages,
							including, but not limited to, loss of data or profit, arising out
							of the use, or the inability to use, the materials on this site,
							even if friendore team or an authorized representative has been
							advised of the possibility of such damages. If your use of
							materials from this site results in the need for servicing, repair
							or correction of equipment or data, you assume any costs thereof.
						</p>
						<p>
							friendore will not be responsible for any outcome that may occur
							during the course of usage of our resources. We reserve the rights
							to change prices and revise the resources usage policy in any
							moment.
						</p>

						<h3 className="mt-6 font-semibold">License</h3>
						<p>
							friendore grants you a revocable, non-exclusive, non-transferable,
							limited license to download, install and use the website strictly
							in accordance with the terms of this Agreement.
						</p>
						<p>
							These Terms &amp; Conditions are a contract between you and
							friendore (referred to in these Terms &amp; Conditions as
							&quot;friendore&quot;, &quot;us&quot;, &quot;we&quot; or
							&quot;our&quot;), the provider of the friendore website and the
							services accessible from the friendore website (which are
							collectively referred to in these Terms &amp; Conditions as the
							&quot;friendore Service&quot;).
						</p>
						<p>
							You are agreeing to be bound by these Terms &amp; Conditions. If
							you do not agree to these Terms &amp; Conditions, please do not
							use the friendore Service. In these Terms &amp; Conditions,
							&quot;you&quot; refers both to you as an individual and to the
							entity you represent. If you violate any of these Terms &amp;
							Conditions, we reserve the right to cancel your account or block
							access to your account without notice.
						</p>

						<h3 className="mt-6 font-semibold">Definitions and key terms</h3>
						<p>
							To help explain things as clearly as possible in this Terms &amp;
							Conditions, every time any of these terms are referenced, are
							strictly defined as:
						</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								Cookie:&nbsp;small amount of data generated by a website and
								saved by your web browser. It is used to identify your browser,
								provide analytics, remember information about you such as your
								language preference or login information.
							</li>
							<li>
								Company: when this policy mentions “Company,” “we,” “us,” or
								“our,” it refers to friendore, that is responsible for your
								information under this Terms &amp; Conditions.
							</li>
							<li>
								Country: where friendore or the owners/founders of friendore are
								based, in this case is
							</li>
							<li>
								Device:&nbsp;any internet connected device such as a phone,
								tablet, computer or any other device that can be used to visit
								friendore and use the services.
							</li>
							<li>
								Service: refers to the service provided by friendore as
								described in the relative terms (if available) and on this
								platform.
							</li>
							<li>
								Third-party service:&nbsp;refers to advertisers, contest
								sponsors, promotional and marketing partners, and others who
								provide our content or whose products or services we think may
								interest you.
							</li>
							<li>
								Website: friendore&rsquo;s site, which can be accessed via this
								URL: https://friendore.com/
							</li>
							<li>
								You: a person or entity that is registered with friendore to use
								the Services.
							</li>
						</ul>

						<h3 className="mt-6 font-semibold">Restrictions</h3>
						<p>You agree not to, and you will not permit others to:</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								License, sell, rent, lease, assign, distribute, transmit, host,
								outsource, disclose or otherwise commercially exploit the
								website or make the platform available to any third party.
							</li>
							<li>
								Modify, make derivative works of, disassemble, decrypt, reverse
								compile or reverse engineer any part of the website.
							</li>
							<li>
								Remove, alter or obscure any proprietary notice (including any
								notice of copyright or trademark) of friendore or its
								affiliates, partners, suppliers or the licensors of the website.
							</li>
						</ul>
						<h3 className="mt-6 font-semibold">Return and Refund Policy</h3>
						<p>
							Thanks for shopping at friendore. We appreciate the fact that you
							like to buy the stuff we build. We also want to make sure you have
							a rewarding experience while you’re exploring, evaluating, and
							purchasing our products.
						</p>
						<p>
							As with any shopping experience, there are terms and conditions
							that apply to transactions at friendore. We’ll be as brief as our
							attorneys will allow. The main thing to remember is that by
							placing an order or making a purchase at friendore, you agree to
							the terms along with friendore&rsquo;s&nbsp;Privacy Policy.
						</p>
						<p>
							If, for any reason, You are not completely satisfied with any good
							or service that we provide, don&rsquo;t hesitate to contact us and
							we will discuss any of the issues you are going through with our
							product.
						</p>

						<h3 className="mt-6 font-semibold">Your Suggestions</h3>
						<p>
							Any feedback, comments, ideas, improvements or suggestions
							(collectively, &quot;Suggestions&quot;) provided by you to
							friendore with respect to the website shall remain the sole and
							exclusive property of friendore.
						</p>
						<p>
							friendore shall be free to use, copy, modify, publish, or
							redistribute the Suggestions for any purpose and in any way
							without any credit or any compensation to you.
						</p>

						<h3 className="mt-6 font-semibold">Your Consent</h3>
						<p>
							We&rsquo;ve updated our&nbsp;Terms &amp; Conditions&nbsp;to
							provide you with complete transparency into what is being set when
							you visit our site and how it&rsquo;s being used. By using our
							website, registering an account, or making a purchase, you hereby
							consent to our Terms &amp; Conditions.
						</p>

						<h3 className="mt-6 font-semibold">Links to Other Websites</h3>
						<p>
							This Terms &amp; Conditions applies only to the Services. The
							Services may contain links to other websites not operated or
							controlled by friendore. We are not responsible for the content,
							accuracy or opinions expressed in such websites, and such websites
							are not investigated, monitored or checked for accuracy or
							completeness by us. Please remember that when you use a link to go
							from the Services to another website, our Terms &amp; Conditions
							are no longer in effect. Your browsing and interaction on any
							other website, including those that have a link on our platform,
							is subject to that website’s own rules and policies. Such third
							parties may use their own cookies or other methods to collect
							information about you.
						</p>

						<h3 className="mt-6 font-semibold">Cookies</h3>
						<p>
							friendore uses &quot;Cookies&quot; to identify the areas of our
							website that you have visited. A Cookie is a small piece of data
							stored on your computer or mobile device by your web browser. We
							use Cookies to enhance the performance and functionality of our
							website but are non-essential to their use. However, without these
							cookies, certain functionality like videos may become unavailable
							or you would be required to enter your login details every time
							you visit the website as we would not be able to remember that you
							had logged in previously. Most web browsers can be set to disable
							the use of Cookies. However, if you disable Cookies, you may not
							be able to access functionality on our website correctly or at
							all. We never place Personally Identifiable Information in
							Cookies.
						</p>

						<h3 className="mt-6 font-semibold">Changes To Our Terms &amp; Conditions</h3>
						<p>
							You acknowledge and agree that friendore may stop (permanently or
							temporarily) providing the Service (or any features within the
							Service) to you or to users generally at sole discretion, without
							prior notice to you. You may stop using the Service at any time.
							You do not need to specifically inform friendore when you stop
							using the Service. You acknowledge and agree that if friendore
							disables access to your account, you may be prevented from
							accessing the Service, your account details or any files or other
							materials which is contained in your account.
						</p>
						<p>
							If we decide to change our Terms &amp; Conditions, we will post
							those changes on this page, and/or update the Terms &amp;
							Conditions modification date below.
						</p>

						<h3 className="mt-6 font-semibold">Modifications to Our website</h3>
						<p>
							friendore reserves the right to modify, suspend or discontinue,
							temporarily or permanently, the website or any service to which it
							connects, with or without notice and without liability to you.
						</p>

						<h3 className="mt-6 font-semibold">Updates to Our website</h3>
						<p>
							friendore may from time to time provide enhancements or
							improvements to the features/ functionality of the website, which
							may include patches, bug fixes, updates, upgrades and other
							modifications (&quot;Updates&quot;).
						</p>
						<p>
							Updates may modify or delete certain features and/or
							functionalities of the website. You agree that friendore has no
							obligation to (i) provide any Updates, or (ii) continue to provide
							or enable any particular features and/or functionalities of the
							website to you.
						</p>
						<p>
							You further agree that all Updates will be (i) deemed to
							constitute an integral part of the website, and (ii) subject to
							the terms and conditions of this Agreement.
						</p>

						<h3 className="mt-6 font-semibold">Third-Party Services</h3>
						<p>
							We may display, include or make available third-party content
							(including data, information, applications and other products
							services) or provide links to third-party websites or services
							(&quot;Third- Party Services&quot;).
						</p>
						<p>
							You acknowledge and agree that friendore shall not be responsible
							for any Third-Party Services, including their accuracy,
							completeness, timeliness, validity, copyright compliance,
							legality, decency, quality or any other aspect thereof. friendore
							does not assume and shall not have any liability or responsibility
							to you or any other person or entity for any Third-Party Services.
						</p>
						<p>
							Third-Party Services and links thereto are provided solely as a
							convenience to you and you access and use them entirely at your
							own risk and subject to such third parties&rsquo; terms and
							conditions.
						</p>

						<h3 className="mt-6 font-semibold">Term and Termination</h3>
						<p>
							This Agreement shall remain in effect until terminated by you or
							friendore.
						</p>
						<p>
							friendore may, in its sole discretion, at any time and for any or
							no reason, suspend or terminate this Agreement with or without
							prior notice.
						</p>
						<p>
							This Agreement will terminate immediately, without prior notice
							from friendore, in the event that you fail to comply with any
							provision of this Agreement. You may also terminate this Agreement
							by deleting the website and all copies thereof from your computer.
						</p>
						<p>
							Upon termination of this Agreement, you shall cease all use of the
							website and delete all copies of the website from your computer.
						</p>
						<p>
							Termination of this Agreement will not limit any of
							friendore&rsquo;s rights or remedies at law or in equity in case
							of breach by you (during the term of this Agreement) of any of
							your obligations under the present Agreement.
						</p>

						<h3 className="mt-6 font-semibold">Copyright Infringement Notice</h3>
						<p>
							If you are a copyright owner or such owner’s agent and believe any
							material on our website constitutes an infringement on your
							copyright, please contact us setting forth the following
							information: (a) a physical or electronic signature of the
							copyright owner or a person authorized to act on his behalf; (b)
							identification of the material that is claimed to be infringing;
							(c) your contact information, including your address, telephone
							number, and an email; (d) a statement by you that you have a good
							faith belief that use of the material is not authorized by the
							copyright owners; and (e) the a statement that the information in
							the notification is accurate, and, under penalty of perjury you
							are authorized to act on behalf of the owner.
						</p>

						<h3 className="mt-6 font-semibold">Indemnification</h3>
						<p>
							You agree to indemnify and hold friendore and its parents,
							subsidiaries, affiliates, officers, employees, agents, partners
							and licensors (if any) harmless from any claim or demand,
							including reasonable attorneys&rsquo; fees, due to or arising out
							of your: (a) use of the website; (b) violation of this Agreement
							or any law or regulation; or (c) violation of any right of a third
							party.
						</p>

						<h3 className="mt-6 font-semibold">No Warranties</h3>
						<p>
							The website is provided to you &quot;AS IS&quot; and &quot;AS
							AVAILABLE&quot; and with all faults and defects without warranty
							of any kind. To the maximum extent permitted under applicable law,
							friendore, on its own behalf and on behalf of its affiliates and
							its and their respective licensors and service providers,
							expressly disclaims all warranties, whether express, implied,
							statutory or otherwise, with respect to the website, including all
							implied warranties of merchantability, fitness for a particular
							purpose, title and non-infringement, and warranties that may arise
							out of course of dealing, course of performance, usage or trade
							practice. Without limitation to the foregoing, friendore provides
							no warranty or undertaking, and makes no representation of any
							kind that the website will meet your requirements, achieve any
							intended results, be compatible or work with any other software, ,
							systems or services, operate without interruption, meet any
							performance or reliability standards or be error free or that any
							errors or defects can or will be corrected.
						</p>
						<p>
							Without limiting the foregoing, neither friendore nor any
							friendore&rsquo;s provider makes any representation or warranty of
							any kind, express or implied: (i) as to the operation or
							availability of the website, or the information, content, and
							materials or products included thereon; (ii) that the website will
							be uninterrupted or error-free; (iii) as to the accuracy,
							reliability, or currency of any information or content provided
							through the website; or (iv) that the website, its servers, the
							content, or e-mails sent from or on behalf of friendore are free
							of viruses, scripts, trojan horses, worms, malware, timebombs or
							other harmful components.
						</p>
						<p>
							Some jurisdictions do not allow the exclusion of or limitations on
							implied warranties or the limitations on the applicable statutory
							rights of a consumer, so some or all of the above exclusions and
							limitations may not apply to you.
						</p>

						<h3 className="mt-6 font-semibold">Limitation of Liability</h3>
						<p>
							Notwithstanding any damages that you might incur, the entire
							liability of friendore and any of its suppliers under any
							provision of this Agreement and your exclusive remedy for all of
							the foregoing shall be limited to the amount actually paid by you
							for the website.
						</p>
						<p>
							To the maximum extent permitted by applicable law, in no event
							shall friendore or its suppliers be liable for any special,
							incidental, indirect, or consequential damages whatsoever
							(including, but not limited to, damages for loss of profits, for
							loss of data or other information, for business interruption, for
							personal injury, for loss of privacy arising out of or in any way
							related to the use of or inability to use the website, third-party
							software and/or third-party hardware used with the website, or
							otherwise in connection with any provision of this Agreement),
							even if friendore or any supplier has been advised of the
							possibility of such damages and even if the remedy fails of its
							essential purpose.
						</p>
						<p>
							Some states/jurisdictions do not allow the exclusion or limitation
							of incidental or consequential damages, so the above limitation or
							exclusion may not apply to you.
						</p>

						<h3 className="mt-6 font-semibold">Severability</h3>
						<p>
							If any provision of this Agreement is held to be unenforceable or
							invalid, such provision will be changed and interpreted to
							accomplish the objectives of such provision to the greatest extent
							possible under applicable law and the remaining provisions will
							continue in full force and effect.
						</p>
						<p>
							This Agreement, together with the Privacy Policy and any other
							legal notices published by friendore on the Services, shall
							constitute the entire agreement between you and friendore
							concerning the Services. If any provision of this Agreement is
							deemed invalid by a court of competent jurisdiction, the
							invalidity of such provision shall not affect the validity of the
							remaining provisions of this Agreement, which shall remain in full
							force and effect. No waiver of any term of this Agreement shall be
							deemed a further or continuing waiver of such term or any other
							term, and friendore&rsquo;s failure to assert any right or
							provision under this Agreement shall not constitute a waiver of
							such right or provision. YOU AND friendore AGREE THAT ANY CAUSE OF
							ACTION ARISING OUT OF OR RELATED TO THE SERVICES MUST COMMENCE
							WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES. OTHERWISE,
							SUCH CAUSE OF ACTION IS PERMANENTLY BARRED.
						</p>

						<h3 className="mt-6 font-semibold">Waiver</h3>
						<p>
							Except as provided herein, the failure to exercise a right or to
							require performance of an obligation under this Agreement shall
							not effect a party&rsquo;s ability to exercise such right or
							require such performance at any time thereafter nor shall be the
							waiver of a breach constitute waiver of any subsequent breach.
						</p>
						<p>
							o failure to exercise, and no delay in exercising, on the part of
							either party, any right or any power under this Agreement shall
							operate as a waiver of that right or power. Nor shall any single
							or partial exercise of any right or power under this Agreement
							preclude further exercise of that or any other right granted
							herein. In the event of a conflict between this Agreement and any
							applicable purchase or other terms, the terms of this Agreement
							shall govern.
						</p>

						<h3 className="mt-6 font-semibold">Amendments to this Agreement</h3>
						<p>
							friendore reserves the right, at its sole discretion, to modify or
							replace this Agreement at any time. If a revision is material we
							will provide at least 30 days&rsquo; notice prior to any new terms
							taking effect. What constitutes a material change will be
							determined at our sole discretion.
						</p>
						<p>
							By continuing to access or use our website after any revisions
							become effective, you agree to be bound by the revised terms. If
							you do not agree to the new terms, you are no longer authorized to
							use friendore.
						</p>

						<h3 className="mt-6 font-semibold">Entire Agreement</h3>
						<p>
							The Agreement constitutes the entire agreement between you and
							friendore regarding your use of the website and supersedes all
							prior and contemporaneous written or oral agreements between you
							and friendore.
						</p>
						<p>
							You may be subject to additional terms and conditions that apply
							when you use or purchase other friendore&rsquo;s services, which
							friendore will provide to you at the time of such use or purchase.
						</p>

						<h3 className="mt-6 font-semibold">Updates to Our Terms</h3>
						<p>
							We may change our Service and policies, and we may need to make
							changes to these Terms so that they accurately reflect our Service
							and policies. Unless otherwise required by law, we will notify you
							(for example, through our Service) before we make changes to these
							Terms and give you an opportunity to review them before they go
							into effect. Then, if you continue to use the Service, you will be
							bound by the updated Terms. If you do not want to agree to these
							or any updated Terms, you can delete your account.
						</p>

						<h3 className="mt-6 font-semibold">Intellectual Property</h3>
						<p>
							The website and its entire contents, features and functionality
							(including but not limited to all information, software, text,
							displays, images, video and audio, and the design, selection and
							arrangement thereof), are owned by friendore, its licensors or
							other providers of such material and are protected by and
							international copyright, trademark, patent, trade secret and other
							intellectual property or proprietary rights laws. The material may
							not be copied, modified, reproduced, downloaded or distributed in
							any way, in whole or in part, without the express prior written
							permission of friendore, unless and except as is expressly
							provided in these Terms &amp; Conditions. Any unauthorized use of
							the material is prohibited.
						</p>

						<h3 className="mt-6 font-semibold">Agreement to Arbitrate</h3>
						<p>
							This section applies to any dispute EXCEPT IT DOESN’T INCLUDE A
							DISPUTE RELATING TO CLAIMS FOR INJUNCTIVE OR EQUITABLE RELIEF
							REGARDING THE ENFORCEMENT OR VALIDITY OF YOUR OR friendore&rsquo;s
							INTELLECTUAL PROPERTY RIGHTS. The term “dispute” means any
							dispute, action, or other controversy between you and friendore
							concerning the Services or this agreement, whether in contract,
							warranty, tort, statute, regulation, ordinance, or any other legal
							or equitable basis. “Dispute” will be given the broadest possible
							meaning allowable under law.
						</p>

						<h3 className="mt-6 font-semibold">Notice of Dispute</h3>
						<p>
							In the event of a dispute, you or friendore must give the other a
							Notice of Dispute, which is a written statement that sets forth
							the name, address, and contact information of the party giving it,
							the facts giving rise to the dispute, and the relief requested.
							You must send any Notice of Dispute via email to:&nbsp;
							<a
								href="/cdn-cgi/l/email-protection"
								className="__cf_email__"
								data-cfemail="8cfff8f9e2e9ede7ccebe1ede5e0a2efe3e1"
							>
								[email&nbsp;protected]
							</a>
							. friendore will send any Notice of Dispute to you by mail to your
							address if we have it, or otherwise to your email address. You and
							friendore will attempt to resolve any dispute through informal
							negotiation within sixty (60) days from the date the Notice of
							Dispute is sent. After sixty (60) days, you or friendore may
							commence arbitration.
						</p>

						<h3 className="mt-6 font-semibold">Binding Arbitration</h3>
						<p>
							If you and friendore don’t resolve any dispute by informal
							negotiation, any other effort to resolve the dispute will be
							conducted exclusively by binding arbitration as described in this
							section. You are giving up the right to litigate (or participate
							in as a party or class member) all disputes in court before a
							judge or jury. The dispute shall be settled by binding arbitration
							in accordance with the commercial arbitration rules of the
							American Arbitration Association. Either party may seek any
							interim or preliminary injunctive relief from any court of
							competent jurisdiction, as necessary to protect the party’s rights
							or property pending the completion of arbitration. Any and all
							legal, accounting, and other costs, fees, and expenses incurred by
							the prevailing party shall be borne by the non-prevailing party.
						</p>

						<h3 className="mt-6 font-semibold">Submissions and Privacy</h3>
						<p>
							In the event that you submit or post any ideas, creative
							suggestions, designs, photographs, information, advertisements,
							data or proposals, including ideas for new or improved products,
							services, features, technologies or promotions, you expressly
							agree that such submissions will automatically be treated as
							non-confidential and non-proprietary and will become the sole
							property of friendore without any compensation or credit to you
							whatsoever. friendore and its affiliates shall have no obligations
							with respect to such submissions or posts and may use the ideas
							contained in such submissions or posts for any purposes in any
							medium in perpetuity, including, but not limited to, developing,
							manufacturing, and marketing products and services using such
							ideas.
						</p>

						<h3 className="mt-6 font-semibold">Promotions</h3>
						<p>
							friendore may, from time to time, include contests, promotions,
							sweepstakes, or other activities (“Promotions”) that require you
							to submit material or information concerning yourself. Please note
							that all Promotions may be governed by separate rules that may
							contain certain eligibility requirements, such as restrictions as
							to age and geographic location. You are responsible to read all
							Promotions rules to determine whether or not you are eligible to
							participate. If you enter any Promotion, you agree to abide by and
							to comply with all Promotions Rules.
						</p>
						<p>
							Additional terms and conditions may apply to purchases of goods or
							services on or through the Services, which terms and conditions
							are made a part of this Agreement by this reference.
						</p>

						<h3 className="mt-6 font-semibold">Typographical Errors</h3>
						<p>
							In the event a product and/or service is listed at an incorrect
							price or with incorrect information due to typographical error, we
							shall have the right to refuse or cancel any orders placed for the
							product and/or service listed at the incorrect price. We shall
							have the right to refuse or cancel any such order whether or not
							the order has been confirmed and your credit card charged. If your
							credit card has already been charged for the purchase and your
							order is canceled, we shall immediately issue a credit to your
							credit card account or other payment account in the amount of the
							charge.
						</p>

						<h3 className="mt-6 font-semibold">Miscellaneous</h3>
						<p>
							If for any reason a court of competent jurisdiction finds any
							provision or portion of these Terms &amp; Conditions to be
							unenforceable, the remainder of these Terms &amp; Conditions will
							continue in full force and effect. Any waiver of any provision of
							these Terms &amp; Conditions will be effective only if in writing
							and signed by an authorized representative of friendore. friendore
							will be entitled to injunctive or other equitable relief (without
							the obligations of posting any bond or surety) in the event of any
							breach or anticipatory breach by you. friendore operates and
							controls the friendore Service from its offices in . The Service
							is not intended for distribution to or use by any person or entity
							in any jurisdiction or country where such distribution or use
							would be contrary to law or regulation. Accordingly, those persons
							who choose to access the friendore Service from other locations do
							so on their own initiative and are solely responsible for
							compliance with local laws, if and to the extent local laws are
							applicable. These Terms &amp; Conditions (which include and
							incorporate the friendore Privacy Policy) contains the entire
							understanding, and supersedes all prior understandings, between
							you and friendore concerning its subject matter, and cannot be
							changed or modified by you. The section headings used in this
							Agreement are for convenience only and will not be given any legal
							import.
						</p>

						<h3 className="mt-6 font-semibold">Disclaimer</h3>
						<p>
							friendore is not responsible for any content, code or any other
							imprecision.
						</p>
						<p>friendore does not provide warranties or guarantees.</p>
						<p>
							In no event shall friendore be liable for any special, direct,
							indirect, consequential, or incidental damages or any damages
							whatsoever, whether in an action of contract, negligence or other
							tort, arising out of or in connection with the use of the Service
							or the contents of the Service. The Company reserves the right to
							make additions, deletions, or modifications to the contents on the
							Service at any time without prior notice.
						</p>
						<p>
							The friendore Service and its contents are provided &quot;as is&quot; and
							&quot;as available&quot; without any warranty or representations
							of any kind, whether express or implied. friendore is a
							distributor and not a publisher of the content supplied by third
							parties; as such, friendore exercises no editorial control over
							such content and makes no warranty or representation as to the
							accuracy, reliability or currency of any information, content,
							service or merchandise provided through or accessible via the
							friendore Service. Without limiting the foregoing, friendore
							specifically disclaims all warranties and representations in any
							content transmitted on or in connection with the friendore Service
							or on sites that may appear as links on the friendore Service, or
							in the products provided as a part of, or otherwise in connection
							with, the friendore Service, including without limitation any
							warranties of merchantability, fitness for a particular purpose or
							non-infringement of third party rights. No oral advice or written
							information given by friendore or any of its affiliates,
							employees, officers, directors, agents, or the like will create a
							warranty. Price and availability information is subject to change
							without notice. Without limiting the foregoing, friendore does not
							warrant that the friendore Service will be uninterrupted,
							uncorrupted, timely, or error-free.
						</p>

						<h3 className="mt-6 font-semibold">Contact Us</h3>
						<p>Don&rsquo;t hesitate to contact us if you have any questions.</p>
						<ul className="list-disc pl-6 space-y-2">
							<li>
								Via Email:{" "}
								<a href="mailto:admin@friendore.com">admin@friendore.com</a>
							</li>
						</ul>
					</main>
				</div>
			</section>
			<Footer />
		</>
	);
}
