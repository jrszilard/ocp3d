// Every old or alternate hostname of the site sends its visitor to the same path on
// https://ocp3d.com with a permanent (308) redirect: www.ocp3d.com, (www.)lostclipsociety.com
// and (www.)ministryofdiscontinuedparts.com, the redirects vercel.json held until the move to
// Cloudflare. The hostnames are this Worker's custom domains (wrangler.jsonc beside this file).
export default {
  fetch(request) {
    const { pathname, search } = new URL(request.url);
    return Response.redirect(`https://ocp3d.com${pathname}${search}`, 308);
  },
};
